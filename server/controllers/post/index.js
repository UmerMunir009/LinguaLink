const router = require("express").Router();
const postServices = require("../../services/post/index");
const {upload}=require('../../utils/multer')


router.post("/post/create",upload.single("media"), postServices.createPost);   
router.get("/post/feed", postServices.getFeed);   


module.exports = router;
