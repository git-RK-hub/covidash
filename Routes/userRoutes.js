const express = require("express");
const userControllers = require("../Controllers/userController");
const authController = require("../Controllers/authController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.get("/me", userControllers.getMe, userControllers.getUser);
router.patch("/updatePassword", authController.updatePassword);
// router.patch(
//   "/updateMyData",
//   userControllers.uploadUserPhoto,
//   userControllers.resizeUserPhoto,
//   userControllers.updateMe
// );
router.delete("/deleteMyData", userControllers.deleteMe);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);

router
  .route("/:id")
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
