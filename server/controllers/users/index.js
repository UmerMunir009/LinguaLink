const router = require("express").Router();
const userServices = require("../../services/users/index");


router.get("/users/recommended", userServices.recommendedUsers);
router.get("/users/friends", userServices.userFriends);

router.post("/users/friend-request/:id", userServices.friendReq);//send friendId
router.patch("/users/friend-request/:id/accept", userServices.acceptReq); //send reqID
router.patch("/users/friend-request/:id/reject", userServices.rejectReq); //send reqID

router.get("/users/friend-request/pending", userServices.getPendingRequests);
router.get("/users/friend-request/outgoing", userServices.getOutgoingRequests);

module.exports = router;
