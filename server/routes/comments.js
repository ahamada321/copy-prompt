const express = require("express");
const router = express.Router();

const UserCtrl = require("./controllers/user");
const CommentCtrl = require("./controllers/comment");

//refering to ./controllers/review.js
router.get("", CommentCtrl.getComments);

router.post("", UserCtrl.authMiddleware, CommentCtrl.createComment);

router.patch("", UserCtrl.authMiddleware, CommentCtrl.editComment);

module.exports = router;
