import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors";
import { Profile } from "../models/profile";
import { responseBody } from "../utility";

// get profiles
const getUserProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profiles = await Profile.find({ active: true })
      .populate("user")
      .sort({ firstname: 1 });

    return res.status(200).json(
      responseBody({
        message: "Profile fetched",
        data: profiles,
      })
    );
  } catch (err) {
    throw next(err);
  }
};

// get profile
const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    const profile = await Profile.findOne({
      user: userId,
    }).populate("user");

    if (!profile) {
      throw new NotFoundError("There is no profile for this user!");
    }

    return res.status(200).json(
      responseBody({
        message: "Profile fetch",
        data: profile,
      })
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
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

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
        { new: true }
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

// active  profile

// deactive profile

export { getUserProfiles, getProfile, addUpdateProfile };
