import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";

import { Post } from "../models/post";
import { User, UserDoc } from "../models/user";
import { responseBody, transformRespnose } from "../utility";

/**
 * get all posts
 */
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find({ active: true });
    return res.status(200).send(
      responseBody({
        message: "Post fetched!",
        data: transformRespnose(posts, "posts"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * get all posts by user id
 */
const getPostByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ user: userId, active: true });

    if (!posts) {
      throw new NotFoundError("There is not post for this user!");
    }

    return res.status(200).send(
      responseBody({
        message: `${userId} post fetched`,
        id: userId,
        data: transformRespnose(posts, "posts"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * get logged in user post
 */
const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFoundError("There is no post belong this postId" + postId);
    }

    return res.status(200).send(
      responseBody({
        message: "Single post fetched",
        id: postId,
        data: transformRespnose(post, "posts"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * get logged in user posts
 * @param req
 * @param res
 * @param next
 */

const loggedInUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.currentUser.id;
    const user = (await User.findById(userId)) as UserDoc;
    if (user.role === "admin") {
      throw new BadRequestError("You are admin, you have not posts");
    }
    const posts = await Post.find({ user: userId, active: true });

    if (!posts) {
      throw new NotFoundError("There is no posts!");
    }

    return res.status(200).send(
      responseBody({
        message: "Post fetched",
        id: userId,
        data: transformRespnose(posts, "posts"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};
/**
 * add update post
 */
const addUpdatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.postId;
    const userId = req.currentUser.id;
    const { title, description, image } = req.body;

    const postExist = await Post.findById(postId);
    if (postExist) {
      postExist.title = title;
      postExist.description = description;
      postExist.image = image.path;

      await postExist.save();

      return res.status(200).send(
        responseBody({
          message: "Post updated successfully!",
          id: postId,
          data: transformRespnose(postExist, "posts"),
        })
      );
    } else {
      const post = Post.build({
        user: userId,
        title,
        description,
        image: image.path,
      });

      await post.save();
      return res.status(200).send(
        responseBody({
          message: "Post added successfully!",
          data: transformRespnose(post, "posts"),
        })
      );
    }
  } catch (err) {
    throw next(err);
  }
};

/**
 * get all posts
 */
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    throw next(err);
  }
};

/**
 * get all posts
 */
const activatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    throw next(err);
  }
};

/**
 * get all posts
 */
const deactivatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    throw next(err);
  }
};

/**
 * add comment
 */
const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    throw next(err);
  }
};

/**
 * delete comment
 */
const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    throw next(err);
  }
};

/**
 * add comment
 */
const addLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    throw next(err);
  }
};

/**
 * delete comment
 */
const removeLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    throw next(err);
  }
};

// export route
export {
  getPosts,
  getPost,
  getPostByUser,
  addUpdatePost,
  deletePost,
  activatePost,
  deactivatePost,
  addComment,
  deleteComment,
  addLike,
  removeLike,
  loggedInUserPosts,
};
