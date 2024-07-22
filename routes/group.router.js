const express = require("express");
const multer = require("multer");
const groupRoute = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/groupimage/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (
    file.fieldname === "group_image" &&
    allowedMimeTypes.includes(file.mimetype)
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type"), false); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 20, // Limit file size to 5MB
  },
});

const groupcontroller = require("../controller/group.controller");

groupRoute.route("/addgroup").post(groupcontroller.add_group);

groupRoute
  .route("/addgroup")
  .post(
    upload.fields([{ name: "group_image", maxCount: 1 }]),
    groupcontroller.add_group
  );

// groupRoute.route("/register").post(groupcontroller.register);

// groupRoute.route("/forgot-password").post(groupcontroller.forgot_password);

// groupRoute.route("/verify-otp").post(groupcontroller.verify_otp);

// groupRoute.route("/reserpassword").post(groupcontroller.reset_password);

module.exports = groupRoute;
