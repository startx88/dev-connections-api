import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import { Profile, ProfileDoc } from "../models/profile";
import { User, UserDoc } from "../models/user";
import { responseBody, transformRespnose } from "../utility";

/**
 * get all users
 *
 * */

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({ active: true });
    const updated = users.filter((user) => user.role !== "admin");
    return res.status(200).json({
      message: "Users fetched",
      data: transformRespnose(updated),
    });
  } catch (err) {
    throw next(err);
  }
};

/**
 * delete user
 *
 * */

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    await Profile.findByIdAndDelete({ user: userId });
    return res.status(200).send(
      responseBody({
        message: "User deleted successfully!",
        id: userId,
        data: transformRespnose(user),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * Active / Deactive user
 *
 *  */

const activeDeactiveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = req.query.status;
    const userId = req.params.userId;
    const user = (await User.findById(userId)) as UserDoc;
    const profile = (await Profile.findOne({ user: userId })) as ProfileDoc;
    if (!user) {
      throw new NotFoundError("User not found!");
    }

    if (!user.active) {
      throw new BadRequestError("User already deactivated!");
    }

    if (status === "deactivate") {
      user.active = false;
      profile.active = false;
      await profile.save();
      await user.save();
      return res.status(200).send(
        responseBody({
          message: "User deactivated successfully",
          id: userId,
          data: transformRespnose(user),
        })
      );
    }

    if (user.active) {
      return res.status(200).send(
        responseBody({
          message: "User already activated!",
          id: userId,
          data: transformRespnose(user),
        })
      );
    }

    user.active = true;
    profile.active = false;
    await profile.save();
    await user.save();
    return res.status(200).send(
      responseBody({
        message: "User activated successfully",
        id: userId,
        data: transformRespnose(user),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

// export
export { getUsers, deleteUser, activeDeactiveUser };
