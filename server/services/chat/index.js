const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { generateStreamToken } = require("../../utils/stream");

const getStreamToken = asyncErrorHandler(async (req, res) => {
   const token=await generateStreamToken({id:req.user.id})

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.SUCCESS,
    token: token,
  });
});




module.exports = {
  getStreamToken
};
