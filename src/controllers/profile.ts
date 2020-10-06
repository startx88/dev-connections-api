import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import { Profile, ProfileDoc } from "../models/profile";
import {
  deleteFile,
  resizeImage,
  responseBody,
  transformRespnose,
} from "../utility";

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
    const userId = req.currentUser?.id;
    const profile = await Profile.findOne({
      user: userId,
    }).populate("user");

    if (!profile) {
      throw new NotFoundError("There is no profile for this user!");
    }

    return res.status(200).json(
      responseBody({
        message: "Profile fetch",
        id: profile._id,
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

    const {
      dob,
      designation,
      experience,
      salary,
      company,
      website,
      location,
      status,
      skills,
      bio,
      gitusername,
    } = req.body;

    const profileExist = await Profile.findOne({ user: userId });

    if (profileExist) {
      const profile = await Profile.findOneAndUpdate(
        { user: userId },
        {
          $set: {
            user: userId,
            dob,
            designation,
            experience,
            salary,
            company,
            website,
            location,
            status,
            skills,
            bio,
            gitusername,
          },
        },
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
      // create new profile
      const profile = Profile.build({
        user: userId,
        dob,
        designation,
        experience,
        salary,
        company,
        website,
        location,
        status,
        skills,
        bio,
        gitusername,
      });

      const result = await profile.save();
      res.status(201).send(
        responseBody({
          message: "Profile added successfully",
          id: result._id,
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

    await profile?.save();

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
      designation,
      company,
      location,
      salary,
      skills,
      description,
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

    const employment = profile.employment?.filter(
      (emp: any) => emp._id !== employmentId
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
    const image = req.file;

    if (!image) {
      throw new BadRequestError("Please select file!");
    }

    if (!profile) {
      throw new NotFoundError("Profile not found!");
    }

    if (image) {
      deleteFile(profile?.image!);
      profile.image = image.path;
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