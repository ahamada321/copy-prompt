const express = require("express");
const router = express.Router();

const UserCtrl = require("./controllers/user");
const PaymentCtrl = require("./controllers/payment");

router.post("/create", UserCtrl.authMiddleware, PaymentCtrl.createSubscription);

router.patch(
  "/confirm",
  UserCtrl.authMiddleware,
  PaymentCtrl.confirmSubscription
);

router.patch(
  "/update",
  UserCtrl.authMiddleware,
  PaymentCtrl.updateSubscription
);

module.exports = router;
