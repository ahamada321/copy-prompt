const express = require("express");
const router = express.Router();

const UserCtrl = require("./controllers/user");
const PaymentCtrl = require("./controllers/payment");

router.get("/:id", UserCtrl.authMiddleware, PaymentCtrl.getPayments);

router.post("/create", UserCtrl.authMiddleware, PaymentCtrl.createPayment);

module.exports = router;
