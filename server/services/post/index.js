const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const cloudinary = require("cloudinary").v2;
const { Post, User, Saved_Post, Post_Like } = require("../../models");
const { Op } = require("sequelize");
const sendNotificationToUser = require("../../utils/notifications");


const createPost = asyncErrorHandler(async (req, res) => {
  const { type, title, description, category, content } = req.body;
  //   console.log("Body data:", req.body);
  //   console.log("File data:", req.file);

  let mediaUrl = null;

  if (req.file) {
    const resourceType = type;

    mediaUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: resourceType },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      stream.end(req.file.buffer); // send buffer to Cloudinary
    });
  }

  const data = await Post.create({
    userId: req.user.id,
    title,
    description: description || "",
    content: content || "",
    category,
    type,
    mediaUrl: mediaUrl || "",
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.SUCCESS,
    data,
  });
});

const getFeed = asyncErrorHandler(async (req, res) => {
  const { limit, offset } = req.pagination;
  const { count, rows: posts } = await Post.findAndCountAll({
    where: {
      userId: {
        [Op.ne]: req.user.id,
      },
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "profilePic", "nativeLanguage"],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  const postIds = posts.map((p) => p.id);

  const savedPosts = await Saved_Post.findAll({
    where: {
      userId: req.user.id,
      postId: { [Op.in]: postIds },
    },
    attributes: ["postId"],
    raw: true,
  });

  const likedPosts = await Post_Like.findAll({
    where: {
      userId: req.user.id,
      postId: { [Op.in]: postIds },
    },
    attributes: ["postId"],
    raw: true,
  });

  const formattedPosts = posts.map((post) => {
    const json = post.toJSON();
    return {
      ...json,
      saved: savedPosts.some((sp) => sp.postId === post.id),
      liked: likedPosts.some((sp) => sp.postId === post.id),
    };
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.SUCCESS,
    data: formattedPosts,
    hasMore: offset + posts.length < count,
  });
});

const getUserPosts = asyncErrorHandler(async (req, res) => {
  const posts = await Post.findAll({
    where: {
      userId: req.user.id,
    },
    order: [["createdAt", "DESC"]],
  });

  const postsWithLikes = await Promise.all(
    posts.map(async (post) => {
      const likeCount = await Post_Like.count({
        where: { postId: post.id },
      });

      return {
        ...post.toJSON(),
        likes: likeCount,
      };
    })
  );

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.SUCCESS,
    data: postsWithLikes,
  });
});

const deletePost = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: "Post not found",
    });
  }

  if (post.userId !== req.user.id) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      statusCode: STATUS_CODES.UNAUTHORIZED,
      message: "You are not authorized to delete this post",
    });
  }

  await post.destroy();

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: "Post deleted successfully",
  });
});

const toggleSave = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: "Post not found",
    });
  }

  const existingSave = await Saved_Post.findOne({
    where: { userId, postId: id },
  });

  if (existingSave) {
    await existingSave.destroy();
    return res.status(STATUS_CODES.SUCCESS).json({
      statusCode: STATUS_CODES.SUCCESS,
      message: "Post unsaved successfully",
    });
  } else {
    await Saved_Post.create({ userId, postId: id });
    return res.status(STATUS_CODES.SUCCESS).json({
      statusCode: STATUS_CODES.SUCCESS,
      message: "Post saved successfully",
    });
  }
});

const getSavedPosts = asyncErrorHandler(async (req, res) => {
  const userId = req.user.id;

  const savedPosts = await Saved_Post.findAll({
    where: { userId },
    attributes: [],
    include: [
      {
        model: Post,
        as: "post",
        attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "profilePic", "nativeLanguage"],
          },
        ],
      },
    ],
  });

  return res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.FOUND,
    data: savedPosts,
  });
});

const toggleLike = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: "Post not found",
    });
  }

  const existingLike = await Post_Like.findOne({
    where: { userId, postId: id },
  });

  if (existingLike) {
    await existingLike.destroy();
    return res.status(STATUS_CODES.SUCCESS).json({
      statusCode: STATUS_CODES.SUCCESS,
      message: "Post unliked successfully",
    });
  } else {
    await Post_Like.create({ userId, postId: id });
    const postOwner = await User.findByPk(post.userId);

    if (postOwner?.fcmToken) {
      const title = `❤️ Post Liked`;
      const message = `${req.user.name} liked your post`;
      await sendNotificationToUser(postOwner.fcmToken, title, message);
    }
    return res.status(STATUS_CODES.SUCCESS).json({
      statusCode: STATUS_CODES.SUCCESS,
      message: "Post liked successfully",
    });
  }
});

module.exports = {
  createPost,
  getFeed,
  getUserPosts,
  deletePost,
  toggleSave,
  getSavedPosts,
  toggleLike,
};
