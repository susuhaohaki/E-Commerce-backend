const express = require("express")
const { userSignUpController, userSignInController,
    userDetailsController
 } = require("../Controller/userController.js")
const authToken = require("../middleware/authToken.js")
const router = express.Router()


router.post('/signup', userSignUpController)
router.post('/signin', userSignInController)
router.get("/user-details",authToken,userDetailsController)
module.exports = router