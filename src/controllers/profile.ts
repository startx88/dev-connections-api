import { NextFunction, Request, Response } from "express";
import { AuthenticationError, NotFoundError } from "../errors";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { responseBody } from "../utility";

// get profiles
const getUserProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profiles = await Profile.find()
      .populate("user", "-password -token -expireToken")
      .sort({ firstname: 1 });

    return res.status(200).json(
      responseBody({
        message: "All user profiles!",
        data: profiles,
      }),
    );
  } catch (err) {
    throw next(err);
  }
};

// get profile
const getProfileByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId;
    const user = await Profile.findOne({ user: userId }).populate(
      "user",
      "-password -token -expireToken",
    );

    if (!user) {
      throw new NotFoundError("there is not profile from this user id");
    }

    return res.status(200).json(responseBody({
      message: "Fetch user profile",
      data: user,
    }));
  } catch (err) {
    throw next(err);
  }
};

// get profile logged in user
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
        id: userId,
        data: profile,
      }),
    );
  } catch (err) {
    console.log(err);
    throw next(err);
  }
};

// addUpdate profile
const addUpdateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.currentUser?.id;

    const {
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
            company,
            website,
            location,
            status,
            skills,
            bio,
            gitusername,
          },
        },
        { new: true },
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profileId: profile?._id,
        profile: profileExist,
      });
    } else {
      // create new profile
      const profile = Profile.build({
        user: userId,
        company,
        website,
        location,
        status,
        skills,
        bio,
        gitusername,
      });

      const result = await profile.save();
      res.status(201).json({
        success: true,
        message: "Profile added successfully",
        profileId: result._id,
        profile,
      });
    }
  } catch (err) {
    throw next(err);
  }
};

// delete profile
const deleteProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.currentUser.id;
  const user = await Profile.findOne({ user: userId });
  if (!user) {
    throw new NotFoundError("There is profile for this user");
  }

  const result = await Profile.findOneAndDelete({ user: userId });

  return res.status(200).send(responseBody({
    message: "Profile deleted",
    id: userId,
    data: result,
  }));
};

//  profile
const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    return res.status(200).send(responseBody({
      message: "status updated",
      data: profile,
      id: userId,
    }));
  } catch (err) {
    throw next(err);
  }
};

// add educaction
const addEducation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.currentUser.id; // logged in user id

    const profile = await Profile.findOne({ user: userId });
  } catch (err) {
    throw next(err);
  }
};

// delete education
const deleteEducation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (err) {
    throw next(err);
  }
};

// add experience
const addExperience = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (err) {
    throw next(err);
  }
};
// delete experience
const deleteExperience = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
};
