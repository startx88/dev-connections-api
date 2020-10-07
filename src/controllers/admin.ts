import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { IComments, Post, PostDoc } from "../models/post";
import { NotFoundError } from "../errors";
import { transformRespnose } from "../utility";

// remove multiple posts
const removeMultiplePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postIds } = req.body;

    const posts = await Post.find({ _id: { $in: postIds } });

    if (!posts) {
      throw new NotFoundError("Posts not found to belonging ids");
    }

    await Post.deleteMany(postIds);
    return res.status(200).send({
      message: "Posts deleted!",
      ids: postIds,
    });
  } catch (err) {
    throw next(err);
  }
};

// delete post by id
const deletePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.postId;
    const post = (await Post.findById(postId)) as PostDoc;

    if (!post) {
      throw new NotFoundError(`No post related to this ${postId}`);
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).send({
      message: "Post Deleted!",
      id: postId,
    });
  } catch (err) {
    throw next(err);
  }
};

// post deactive / active by post id
const postActiveDeactive = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.postId;
    const status = req.query.status;
    const post = (await Post.findById(postId)) as PostDoc;

    if (!post) {
      throw new NotFoundError(`No post related to this ${postId}`);
    }

    if (status === "deactivate") {
      await Post.findByIdAndUpdate(postId, { $set: { active: false } });
      return res.status(200).send({
        message: "Post deactivated!",
        id: postId,
        data: transformRespnose(post, "posts"),
      });
    }

    post.active = true;
    await post.save();

    return res.status(200).send({
      message: "Post activated!",
      id: postId,
      data: transformRespnose(post, "posts"),
    });
  } catch (err) {
    throw next(err);
  }
};

// delete comment
const deletePostComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const post = (await Post.findById(postId)) as PostDoc;

    if (!post) {
      throw new NotFoundError(`No post related to this ${postId}`);
    }

    // comments filter by comment id
    const comments = post.comments?.filter(
      (comment: IComments) => comment._id?.toString() !== commentId
    ) as IComments[];
    post.comments = comments;

    await post.save();
    return res.status(200).send({
      message: "Post Deleted!",
      id: postId,
    });
  } catch (err) {
    throw next(err);
  }
};

const rejectPostComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const post = (await Post.findById(postId)) as PostDoc;

    // ! post then throw error
    if (!post) {
      throw new NotFoundError(`No post related to this ${postId}`);
    }

    // comments filter by comment id
    const existingComments = post.comments as IComments[];
    const index = existingComments.findIndex(
      (comment: IComments) => comment._id === commentId
    );

    // comment status update
    const comment = existingComments[index] as IComments;
    comment.status = "rejected";
    existingComments[index] = comment;
    post.comments = existingComments;

    // save post
    await post.save();
    return res.status(200).send({
      message: "Post Deleted!",
      id: postId,
    });
  } catch (err) {
    throw next(err);
  }
};

// export
export {
  deletePostById,
  deletePostComment,
  rejectPostComment,
  postActiveDeactive,
  removeMultiplePost,
};
