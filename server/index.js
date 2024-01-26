const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const path = require("path");
const config = require("./config");
const FakeDb = require("./fake-db");

const rentalRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");
const paymentRoutes = require("./routes/payments");
const reviewRoutes = require("./routes/reviews");
const contactformRoutes = require("./routes/contactforms");
// const imageUploadRoutes = require("./routes/image-upload");

mongoose
  .connect(config.DB_URI, {})
  .then(() => {
    if (process.env.NODE_ENV !== "production") {
      // const fakeDb = new FakeDb();
      // fakeDb.seeDb();
    }
  })
  .catch((err) => console.error(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression()); // compress middleware

app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/contactforms", contactformRoutes);
// app.use("/api/v1", imageUploadRoutes);

if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "dist", "copy-prompt");

  const redirectToHttps = (req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      const httpsUrl = "https://" + req.headers.host + req.url;
      return res.redirect(301, httpsUrl);
    }
    next();
  };
  app.use(redirectToHttps);

  app.use(express.static(appPath));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("I am running");
});
