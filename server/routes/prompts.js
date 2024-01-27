const express = require("express");
const router = express.Router();

const UserCtrl = require("./controllers/user");
const PromptCtrl = require("./controllers/prompt");

router.get("/secret", UserCtrl.authMiddleware, function (req, res) {
  res.json({ secret: true });
});

router.get("/manage", UserCtrl.authMiddleware, PromptCtrl.getOwnerPrompts);

router.get("/total", PromptCtrl.getPromptsTotal);

router.get("/:id", PromptCtrl.getPromptById);

router.post("/create", UserCtrl.authMiddleware, PromptCtrl.createPrompt);

router.post("", PromptCtrl.getPrompts);

router.patch("/:id", UserCtrl.authMiddleware, PromptCtrl.updatePrompt);

router.delete("/:id", UserCtrl.authMiddleware, PromptCtrl.deletePrompt);

// router.get("/search/:searchWords", PromptCtrl.searchPrompts);

module.exports = router;
