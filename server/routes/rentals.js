const express = require("express");
const router = express.Router();

const UserCtrl = require("./controllers/user");
const RentalCtrl = require("./controllers/rental");

router.get("/secret", UserCtrl.authMiddleware, function (req, res) {
  res.json({ secret: true });
});

router.get("/manage", UserCtrl.authMiddleware, RentalCtrl.getOwnerRentals);

router.get("/total", RentalCtrl.getRentalsTotal);

router.get("/:id", RentalCtrl.getRentalById);

router.delete("/:id", UserCtrl.authMiddleware, RentalCtrl.deleteRental);

router.patch("/:id", UserCtrl.authMiddleware, RentalCtrl.updateRental);

router.post("/create", UserCtrl.authMiddleware, RentalCtrl.createRental);

router.post("", RentalCtrl.getRentals);

// router.get("/search/:searchWords", RentalCtrl.searchRentals);

module.exports = router;
