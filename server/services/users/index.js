const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { User, Friend } = require("../../models");
const { Op } = require("sequelize");

const recommendedUsers = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  const friendships = await Friend.findAll({
    where: {
      [Op.or]: [{ userId: req.user.id }, { friendId: req.user.id }],
    },
    attributes: ["userId", "friendId"],
    raw: true,
  });

  //getting frind ids
  const friendIds = friendships.map((f) =>
    f.userId === req.user.id ? f.friendId : f.userId
  );

  const users = await User.findAll({
    where: {
      id: { [Op.notIn]: [req.user.id, ...friendIds] },
      isOnBoarded: true,
    },
    attributes: [
      "id",
      "name",
      "bio",
      "nativeLanguage",
      "learningLanguage",
      "profilePic",
      "location",
    ],
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.SUCCESS,
    data: users,
  });
});

const userFriends = asyncErrorHandler(async (req, res) => {
  const friendships = await Friend.findAll({
    where: {
      status: "accepted",
      [Op.or]: [{ userId: req.user.id }, { friendId: req.user.id }],
    },
    attributes: ["userId", "friendId"],
    raw: true,
  });

  //getting frind ids
  const friendIds = friendships.map((f) =>
    f.userId === req.user.id ? f.friendId : f.userId
  );

  const friends = await User.findAll({
    where: {
      id: { [Op.in]: [...friendIds] },
      isOnBoarded: true,
    },
    attributes: [
      "id",
      "name",
      "bio",
      "nativeLanguage",
      "learningLanguage",
      "profilePic",
      "location",
    ],
  });
 

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.SUCCESS,
    data: friends,
  });
});

const friendReq = asyncErrorHandler(async (req, res) => {
  const friendId = req.params.id;

  if (friendId === req.user.id) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "You cannot send a friend request to yourself.",
    });
  }

  const existingReq = await Friend.findOne({
    where: {
      [Op.or]: [
        { userId: req.user.id, friendId: friendId },
        { userId: friendId, friendId: req.user.id },
      ],
      status: { [Op.in]: ["pending", "accepted"] },
    },
  });

  if (existingReq) {
    return res.status(400).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      message:
        existingReq.status === "pending"
          ? "Friend request already sent."
          : "You are already friends.",
    });
  }

  const data = await Friend.create({
    userId: req.user.id,
    friendId,
    status: "pending",
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.SUCCESS,
    data: data,
  });
});

const acceptReq = asyncErrorHandler(async (req, res) => {
  const id = req.params.id;
  const request = await Friend.findOne({
    where: {
      id,
      status: "pending",
    },
  });

  if (!request) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: "No pending friend request found.",
    });
  }

  request.status = "accepted";
  await request.save();

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.SUCCESS,
    data: request,
  });
});

const rejectReq = asyncErrorHandler(async (req, res) => {
  const id = req.params.id;
  const request = await Friend.findOne({
    where: {
      id,
      status: "pending",
    },
  });

  if (!request) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: "No pending friend request found.",
    });
  }

  request.status = "rejected";
  await request.save();

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.SUCCESS,
    data: request,
  });
});

//all reqs that will be visible to reciever
const getPendingRequests = asyncErrorHandler(async (req, res) => {
  const pendingReqs = await Friend.findAll({
    where: {
      friendId: req.user.id,
      status: "pending",
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: [
          "id",
          "name",
          "bio",
          "nativeLanguage",
          "learningLanguage",
          "profilePic",
          "location",
        ],
      },
    ],
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.SUCCESS,
    data: pendingReqs,
  });
});

const getOutgoingRequests = asyncErrorHandler(async (req, res) => {
  const outgoingReqs = await Friend.findAll({
    where: {
      userId: req.user.id,
      status: "pending",
    },
    include: [
      {
        model: User,
        as: "friend",
        attributes: [
          "id",
          "name",
          "bio",
          "nativeLanguage",
          "learningLanguage",
          "profilePic",
        ],
      },
    ],
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.SUCCESS,
    data: outgoingReqs,
  });
});

//TODO:GET API for recently accepted requeests
module.exports = {
  recommendedUsers,
  userFriends,
  friendReq,
  acceptReq,
  rejectReq,
  getPendingRequests,
  getOutgoingRequests,
};
