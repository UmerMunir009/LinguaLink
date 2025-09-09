const router = require("express").Router();
const userServices = require("../../services/users/index");


router.get("/users/recommended", userServices.recommendedUsers); 
router.get("/users/friends", userServices.userFriends); 
router.post("/users/friend-request/:id", userServices.friendReq); //send friendID
router.post("/users/accept-request/:id", userServices.acceptReq); //send reqID
router.post("/users/reject-request/:id", userServices.rejectReq); //send reqID

module.exports = router;

