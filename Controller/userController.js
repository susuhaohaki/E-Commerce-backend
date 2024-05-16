const { UserSignUpService, userSignInService } = require("../Service/userService.js")

const userSignUpController = async (req, res) => {
    try {
        const result = await UserSignUpService(req.body);
        return res.status(201).json({
            data: result,
            success: true,
            error: false,
            message: "User created successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

const userSignInController = async (req, res) => {
    try {
        const { user, token } = await userSignInService(req.body)
        const tokenOption = {
            httpOnly: true,
            secure: true
        }
        return res.cookie("token", token, tokenOption).json({
            data: user,
            token: token,
            success: true,
            error: false,
            message: "login successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}


module.exports = { userSignUpController, userSignInController }