const express = require("express");
const { loginController,
    registerController
 } = require("../controllers/user.controller.js");



// const authMiddleware = require("../middlewares/auth.middleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

module.exports = router;