import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import { Profile, ProfileDoc } from "../models/profile";
import { User, UserDoc } from "../models/user";
import axios from "axios";
import {
  deleteFile,
  resizeImage,
  responseBody,
  transformRespnose,
} from "../utility";
import { defautlConfig } from "../config";

/**
 * Get user profiles
 * @param req
 * @param res
 * @param next
 */
const getUserProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) || 1;
    const PER_PAGE = 10;
    const totalItem = await Profile.find().countDocuments();
    const profiles = await Profile.find()
      .populate("user", "-password -token -expireToken")
      .sort({ firstname: 1 });
    return res.status(200).json(
      responseBody({
        message: "All user profiles!",
        currentPage: page,
        total: totalItem,
        hasPrev: page > 1,
        next: page + 1,
        prev: page - 1,
        hasNext: page * PER_PAGE < totalItem,
        data: transformRespnose(profiles, "profile"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * get profile by user id
 * @param req
 * @param res
 * @param next
 */
const getProfileByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "-password -token -expireToken"
    );

    if (!profile) {
      throw new NotFoundError("there is not profile from this user id");
    }

    return res.status(200).json(
      responseBody({
        message: "Fetch user profile",
        data: transformRespnose(profile, "profile"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * fetch currently logged in user profile
 * @param req
 * @param res
 * @param next
 */
const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.currentUser.id;
    const user = (await User.findById(userId)) as UserDoc;
    const profile = (await Profile.findOne({
      user: userId,
    }).populate("user", "-password -token -expireToken")) as ProfileDoc;

    if (user.role === "admin") {
      throw new BadRequestError("You are admin, you don't have any profile.");
    }

    if (!profile) {
      throw new NotFoundError("There is no profile for this user!");
    }

    return res.status(200).json(
      responseBody({
        message: "Profile fetch",
        data: transformRespnose(profile, "profile"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

// addUpdate profile
const addUpdateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.currentUser?.id;
    const profileId = req.params.profileId;

    const {
      status,
      company,
      designation,
      experience,
      salary,
      website,
      location,
      qualification,
      languages,
      skills,
      avatar,
      dob,
      gender,
      resume,
      hobbies,
      summary,
      gitusername,
      noticeperiod,
    } = req.body;

    const profileInfo = {
      user: userId,
      status,
      company,
      designation,
      experience,
      salary,
      website,
      location,
      qualification,
      languages,
      skills,
      avatar,
      dob,
      gender,
      resume,
      hobbies,
      summary,
      gitusername,
      noticeperiod,
    };

    // check if user profile already existed then update profile
    const profileExist = await Profile.findOne({
      _id: profileId,
      user: userId,
    });

    console.log(profileExist);

    if (profileExist) {
      const profile = await Profile.findOneAndUpdate(
        { user: userId },
        { $set: profileInfo },
        { new: true }
      );

      return res.status(200).send(
        responseBody({
          message: "Profile updated successfully",
          id: profile?._id,
          data: transformRespnose(profileExist, "profile"),
        })
      );
    } else {
      const hasProfile = await Profile.findOne({ user: userId });
      if (hasProfile) {
        throw new BadRequestError("Profile already existed, Please update.");
      }
      // create new profile
      const profile = Profile.build({
        ...profileInfo,
        education: [],
        employment: [],
      });

      const result = await profile.save();
      res.status(201).send(
        responseBody({
          message: "Profile added successfully",
          data: transformRespnose(profile, "profile"),
        })
      );
    }
  } catch (err) {
    throw next(err);
  }
};

// delete profile
const deleteProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.currentUser.id;
  const profile = await Profile.findOne({ user: userId });
  if (!profile) {
    throw new NotFoundError("There is profile for this user");
  }
  const result = await Profile.findOneAndDelete({ user: userId });
  return res.status(200).send(
    responseBody({
      message: "Profile deleted",
      id: profile._id,
      data: transformRespnose(result, "profile"),
    })
  );
};

//  profile
const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.currentUser.id;

    const user = await User.findById(userId);
    if (user?.role === "admin") {
      throw new BadRequestError("You are admin, you don't have any profile.");
    }

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      console.log("profile");
      throw new NotFoundError("There is no profile found for this user");
    }

    profile.status = req.body.status;
    await profile.save();
    return res.status(200).send(
      responseBody({
        message: "status updated",
        id: profile._id,
        data: transformRespnose(profile, "profile"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

// add educaction
const addEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.currentUser.id; // logged in user id
    const profile = (await Profile.findOne({ user: userId })) as ProfileDoc;

    const {
      college,
      course,
      subject,
      board,
      medium,
      totalMarks,
      from,
      to,
      current,
      description,
    } = req.body;

    profile.education?.unshift({
      college,
      course,
      subject,
      board,
      medium,
      totalMarks,
      from,
      to,
      current,
      description,
    });

    await profile.save();

    return res.status(200).send(
      responseBody({
        message: "education added to the current user profile",
        id: profile._id,
        data: transformRespnose(profile, "profile"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

// delete education
const deleteEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const educationId = req.params.educationId;
    const userId = req.currentUser.id;

    const profile = (await Profile.findOne({ user: userId })) as ProfileDoc;

    if (!profile) {
      throw new NotFoundError("Profile not found!");
    }

    const educationUpdated = profile.education?.filter(
      (edu: any) => edu._id.toString() !== educationId
    );

    profile.education = educationUpdated;
    await profile.save();

    return res.status(200).send(
      responseBody({
        message: "education deleted!",
        data: profile,
        id: educationId,
      })
    );
  } catch (err) {
    throw next(err);
  }
};

// add experience
const addEmployment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.currentUser.id;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      throw new NotFoundError("Profile not found!");
    }

    const {
      company,
      designation,
      location,
      salary,
      skills,
      description,
      award,
      from,
      to,
      current,
    } = req.body;

    profile.employment?.unshift({
      designation,
      company,
      location,
      salary,
      skills,
      description,
      award,
      from,
      to,
      current,
    });

    await profile.save();

    return res.status(200).send(
      responseBody({
        message: "Employment added to the profile!",
        id: profile._id,
        data: transformRespnose(profile, "profile"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};
// delete experience
const deleteEmployment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.currentUser.id;
    const employmentId = req.params.employmentId;
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      throw new NotFoundError("Profile not found!");
    }

    // check if employment exist or not
    const existEmployment = profile.employment?.find(
      (emp: any) => emp._id.toString() === employmentId
    );

    if (!existEmployment) {
      throw new BadRequestError(
        "You can not delete another developer employment."
      );
    }

    const employment = profile.employment?.filter(
      (emp: any) => emp._id.toString() !== employmentId
    );

    profile.employment = employment;
    await profile.save();

    return res.status(200).send(
      responseBody({
        message: "Employment deleted!",
        id: employmentId,
        data: transformRespnose(profile, "profile"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

// upload avatar
const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.currentUser.id;
    const profile = (await Profile.findOne({ user: userId })) as ProfileDoc;
    if (!profile) {
      throw new NotFoundError("Profile not found!");
    }

    const image = req.file;
    if (!image) {
      throw new BadRequestError("Please select file!");
    }

    if (image) {
      deleteFile(profile.avatar);
      profile.avatar = image.path;
    }

    const result = await profile.save();
    if (result) {
      resizeImage(image.path, 250, 140);
    }
    return res.status(200).json({
      message: "File uploaded",
      idd: profile._id,
      data: transformRespnose(profile, "profile"),
    });
  } catch (err) {
    throw next(err);
  }
};

const getGitProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.currentUser.id;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      throw new NotFoundError("Profile not found!");
    }
  } catch (err) {
    throw next(err);
  }
};

// ADD AVATAR
const getGitProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.currentUser.id;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      throw new NotFoundError("Profile not found!");
    }

    const uri = `https://api.github.com/users/${req.params.username}/repos?per_page=10&sort=created:asc&
    client_id=${defautlConfig.GITHUB_CLIENT_ID}&client_secret=${defautlConfig.GITHUB_CLIENT_ID}`;

    const response = await axios.get(uri, {
      headers: { "user-agent": "node-js" },
    });

    return res.status(200).send(
      responseBody({
        message: "Github profile fetched!",
        data: response.data,
      })
    );
  } catch (err) {
    throw next(err);
  }
};

export {
  getUserProfiles,
  getProfile,
  addUpdateProfile,
  getProfileByUserId,
  deleteProfile,
  updateStatus,
  addEducation,
  deleteEducation,
  addEmployment,
  deleteEmployment,
  uploadImage,
  getGitProfile,
};
