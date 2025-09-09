const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { generateToken } = require("../../utils/jwtToken");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const { User } = require("../../models");
const { upsertStreamUser } = require("../../utils/stream");

const signup = asyncErrorHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isExist = await User.findOne({ where: { email }, raw: true });

  if (isExist) {
    return res.status(STATUS_CODES.CONFLICT).json({
      statusCode: STATUS_CODES.CONFLICT,
      message: "Email already used.",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const seed = Math.floor(Math.random() * 10000);
  const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

  const userData = {
    name,
    email,
    password: hashedPassword,
    profilePic: randomAvatar,
  };

  const data = await User.create(userData);
  const user = await User.findByPk(data.id, { raw: true }); // plain object (very important)

  await upsertStreamUser({
    id: user.id,
    name: user.name,
    image: user.profilePic || "",
  });

  const { profilePic, ...userWithoutPic } = user;

  let token = generateToken(userWithoutPic);
  res.cookie("token", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none", // allow cross-site cookie
    secure: true, // required when sameSite='none'
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data,
  });
});

const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email }, raw: true });

  if (!user) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: "Email doesnot exists",
    });
  }

  const isPassword = await bcrypt.compare(password, user?.password);
  if (!isPassword) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      statusCode: STATUS_CODES.UNAUTHORIZED,
      message: "Invalid email or password",
    });
  }
  const { profilePic, ...userWithoutPic } = user;
  let token = generateToken(userWithoutPic);

  res.cookie("token", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none", // allow cross-site cookie
    secure: true, // required when sameSite='none'
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.LOGIN,
    data: user,
  });
});

const logout = asyncErrorHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 0,
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.LOGOUT,
  });
});


const onboarding = asyncErrorHandler(async (req, res) => {
  const {bio, nativeLanguage, learningLanguage, location} = req.body;

  const user = await User.findOne({ where: { id: req?.user.id }, raw: true });

  if (!user) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: TEXTS.NOT_FOUND,
    });
  }
  
  await User.update({ bio, nativeLanguage, learningLanguage, location, isOnBoarded: true },
      { where: { id: req.user.id } }
   );

  const updatedUser = await User.findByPk(req?.user.id, { raw: true }); // plain object

  const { profilePic, ...userWithoutPic } = updatedUser;
  let token = generateToken(userWithoutPic);

  res.cookie("token", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none", 
    secure: true,
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.UPDATED,
    data: updatedUser,
  });
});

const checkAuth = asyncErrorHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.VERIFIED,
    data: user,
  });
});

module.exports = {
  signup,
  login,
  logout,
  onboarding,
  checkAuth,
};
