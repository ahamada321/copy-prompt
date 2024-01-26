const express = require("express");
const router = express.Router();

const UserCtrl = require("./controllers/user");

//refering to ./controllers/user.js
router.post("/auth", UserCtrl.auth);

router.post("/register", UserCtrl.register);

router.get("/:id", UserCtrl.getUserById);

router.get("", UserCtrl.getUsers);

router.patch("/:id", UserCtrl.authMiddleware, UserCtrl.updateUser);

router.delete("/:id", UserCtrl.authMiddleware, UserCtrl.deleteUser);

module.exports = router;
