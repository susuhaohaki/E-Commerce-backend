const express = require("express")
const { userSignUpController, userSignInController } = require("../Controller/userController.js")

const router = express.Router()


router.post('/signup', userSignUpController)
router.post('/signin', userSignInController)

module.exports = router