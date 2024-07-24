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

const storage_category = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/category/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (
    (file.fieldname === "group_image" &&
      allowedMimeTypes.includes(file.mimetype)) ||
    (file.fieldname === "category_image" &&
      allowedMimeTypes.includes(file.mimetype))
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

const upload_category = multer({
  storage: storage_category,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 20, // Limit file size to 5MB
  },
});

const groupcontroller = require("../controller/group.controller");

groupRoute
  .route("/addgroup")
  .post(
    upload.fields([{ name: "group_image", maxCount: 1 }]),
    groupcontroller.add_group
  );

groupRoute
  .route("/addcategory")
  .post(
    upload_category.fields([{ name: "category_image", maxCount: 1 }]),
    groupcontroller.add_category
  );

groupRoute.route("/getallcategory").get(groupcontroller.getAllCategory);

groupRoute.route("/getallgroup").get(groupcontroller.getAllGroup);

groupRoute.route("/getalllinks").get(groupcontroller.getAllLinks);

groupRoute
  .route("/getlinkbycategoryy/:id")
  .get(groupcontroller.getAllLinkByCategory);

groupRoute.route("/deletelink/:id").delete(groupcontroller.deletelinks);

groupRoute.route("/getaboutus").get(groupcontroller.getAboutUs);

groupRoute.route("/getprivacypolicy").get(groupcontroller.getPrivacyPolicy);

groupRoute.route("/deletecategory/:id").delete(groupcontroller.deletecategory);

module.exports = groupRoute;
