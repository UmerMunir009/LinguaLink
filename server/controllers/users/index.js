const router = require("express").Router();
const userServices = require("../../services/users/index");


router.get("/users/recommended", userServices.recommendedUsers);
router.get("/users/:id/friends", userServices.userFriends);

router.post("/friend-request", userServices.friendReq);//send friendId
router.patch("/friend-request/:id/accept", userServices.acceptReq); //send reqID
router.patch("/friend-request/:id/reject", userServices.rejectReq); //send reqID

router.get("/friend-request/pending", userServices.getPendingRequests);

module.exports = router;
