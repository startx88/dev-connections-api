import { NextFunction, Request, Response } from "express";
import { Multer } from "multer";
import { BadRequestError, NotFoundError } from "../errors";
import { ILike, Post, PostDoc } from "../models/post";
import { User, UserDoc } from "../models/user";
import { deleteFile, responseBody, transformRespnose } from "../utility";

/**
 * get all posts
 */
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = (await Post.find({ active: true }).populate(
      "user",
      "-password -token -expireToken"
    )) as PostDoc[];
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
    const posts = (await Post.find({ user: userId, active: true }).populate(
      "user",
      "-password -token -expireToken"
    )) as PostDoc[];

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
    const post = (await Post.findById(postId).populate(
      "user",
      "-password -token -expireToken"
    )) as PostDoc;
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
    const posts = await Post.find({ user: userId, active: true });
    if (!posts) {
      throw new NotFoundError("You have not posts!");
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

    const user = (await User.findById(userId)) as UserDoc;

    if (!user) {
      throw new NotFoundError("You have no permission to add / update post.");
    }

    const { title, description } = req.body;
    const image = req.file;
    const postExist = (await Post.findById(postId)) as PostDoc;

    if (postExist) {
      postExist.title = title;
      postExist.description = description;
      if (image) {
        deleteFile(postExist.image);
        postExist.image = image.path;
      }

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
      return res.status(201).send(
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
    const postId = req.params.postId;
    const post = (await Post.findById(postId)) as PostDoc;

    if (!post) {
      throw new NotFoundError("There is no post found");
    }

    const result = await Post.findByIdAndDelete(postId);

    if (result) {
      deleteFile(post.image);
    }

    return res.status(200).send(
      responseBody({
        message: "Post deleted successfully",
        data: transformRespnose(post, "posts"),
      })
    );
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
    const postId = req.params.postId;
    const userId = req.currentUser.id;
    const post = (await Post.findOne({ _id: postId, user: userId })) as PostDoc;

    if (!post) {
      throw new BadRequestError("This post not belong to you!");
    }

    if (post.active) {
      throw new BadRequestError("Post already activated!");
    }

    post.active = true;
    await post.save();

    return res.status(200).send(
      responseBody({
        message: "Post activated!",
        data: transformRespnose(post, "posts"),
      })
    );
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
    const postId = req.params.postId;
    const userId = req.currentUser.id;
    const post = (await Post.findOne({ _id: postId, user: userId })) as PostDoc;

    if (!post) {
      throw new BadRequestError("This post not belong to you!");
    }

    if (!post.active) {
      throw new BadRequestError("Post already deactivated!");
    }

    post.active = false;
    await post.save();

    return res.status(200).send(
      responseBody({
        message: "Post deactivated!",
        data: transformRespnose(post, "posts"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * add comment
 */
const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.postId;
    const userId = req.currentUser.id;
    const post = (await Post.findById(postId)) as PostDoc;

    if (!post) {
      throw new NotFoundError("Post not found!");
    }

    const { name, message } = req.body;
    const status = message.includes("sex") ? "rejected" : "approved";

    post.comments?.push({
      user: userId,
      name,
      message,
      status,
    });

    await post.save();
    return res.status(200).send(
      responseBody({
        message: "Comment added!",
        id: postId,
        data: transformRespnose(post, "posts"),
      })
    );
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
    const userId = req.currentUser.id;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const post = (await Post.findById(postId)) as PostDoc;

    if (!post) {
      throw new NotFoundError("Post not found!");
    }

    const comment = await post.comments?.find(
      (comment) =>
        comment.user.toString() === userId &&
        comment._id!.toString() === commentId
    );

    if (!comment) {
      throw new BadRequestError("You can not delete another user comment!");
    }

    const comments = post.comments?.filter(
      (com) => com._id?.toString() !== commentId
    );
    post.comments = comments;
    await post.save();

    return res.status(200).send(
      responseBody({
        message: "Comment deleted!",
        data: transformRespnose(post, "posts"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * add comment
 */
const addLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.currentUser.id; // userId
    const postId = req.params.postId; // postId
    const post = (await Post.findById(postId)) as PostDoc;

    // get all likes
    const Likes = post.likes?.filter(
      (like: ILike) => like.user.toString() === userId
    ) as ILike[];

    if (Likes.length > 0) {
      const like = <ILike>(
        post.likes?.find((like) => like.user.toString() === userId)
      );
      if (like.active) {
        throw new BadRequestError("You have already liked this post!");
      }
      updateLikes(post, userId, true);
    } else {
      post.likes?.unshift({ user: userId, active: true });
    }

    // save post after updating
    await post.save();
    return res.status(200).send(
      responseBody({
        message: "You like the post!",
        data: transformRespnose(post, "posts"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * Remove like from post
 */
const removeLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.currentUser.id;
    const postId = req.params.postId;

    // get post by post id
    const post = (await Post.findById(postId)) as PostDoc;
    if (!post) {
      throw new NotFoundError("Post not found!");
    }
    // all likes
    const postLikes = post.likes?.filter(
      (like) => like.user.toString() === userId
    ) as ILike[];

    if (postLikes.length > 0) {
      const dislike = post.likes?.find(
        (like: ILike) => like.user.toString() === userId
      ) as ILike;

      if (!dislike.active) {
        throw new BadRequestError("You have already dislike this post!");
      }
      updateLikes(post, userId, false);
    } else {
      post.likes?.unshift({ user: userId, active: false });
    }

    await post.save();
    return res.status(200).send(
      responseBody({
        message: "You dislike the post!",
        data: transformRespnose(post, "posts"),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

// update like
function updateLikes(post: PostDoc, userId: string, value: boolean) {
  const existLikes = post.likes as ILike[];
  const index = existLikes.findIndex(
    (like: ILike) => like.user.toString() === userId
  );
  const existLike = existLikes[index];
  existLike.active = value;
  existLikes[index] = existLike;
  post.likes = existLikes;
}

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
