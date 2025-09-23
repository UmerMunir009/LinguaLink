const router = require("express").Router();
const chatServices = require("../../services/chat/index");


router.get("/chat/stream-token", chatServices.getStreamToken);   


module.exports = router;
