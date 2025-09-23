const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const cloudinary = require("cloudinary").v2;
const { Post ,User} = require("../../models"); 
const { Op } = require("sequelize");

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
    description:description || "",
    content:content || "",
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
  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.SUCCESS,
    data: posts,
    hasMore: offset + posts.length < count, 
  });
});



module.exports = {
  createPost,
  getFeed
};
