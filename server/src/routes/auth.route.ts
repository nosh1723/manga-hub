import { Router } from "express";
import authController from "../controllers/auth.controller";


const authRouter = Router()

authRouter.post("/register", authController.register)
authRouter.post("/login", authController.login)
authRouter.post("/refresh-token", authController.refreshToken)
authRouter.post("/logout", authController.logout)
authRouter.post("/forgot-password", authController.forgotPassword)
authRouter.post("/compare-code", authController.compareCode)
authRouter.post("/update-forgot-password", authController.updateForgotPassword)
authRouter.post("/change-password", authController.changePassword)

authRouter.get("/current-user", authController.currentUser)

export default authRouter