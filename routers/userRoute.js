const express = require("express");
const userController = require("../controllers/userController");
const pageController = require("../controllers/pageController");
const redirectMiddleware = require("../middlewares/redirectMiddleware");

const router = express.Router();

router
  .route("/register")
  .get(redirectMiddleware, pageController.getRegisterPage); //http://localhost:3000/user/register
router.route("/register").post(userController.createUser); //http://localhost:3000/user/register
router.route("/login").get(redirectMiddleware, pageController.getLoginPage); //http://localhost:3000/user/login
router.route("/login").post(userController.loginUser); //http://localhost:3000/user/login
router.route("/logout").get(userController.logoutUser); //http://localhost:3000/user/logout

module.exports = router;
