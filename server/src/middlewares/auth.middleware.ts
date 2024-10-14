import { NextFunction, Request, Response } from "express"
import jwt, { VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";
import STATUS from "../utils/status";

dotenv.config()


const authMiddleware = {
    verifyToken: (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (token) {
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, process.env.SECRET_ACCESSTOKEN!,
                (err: VerifyErrors | null, user?: object | string) => {
                    if (err) {
                        return res.status(STATUS.AUTHORIZED).json({
                            message: err.message,
                        });
                    }
                    if (!user) return
                    next()
                })
        }else{
            return res.status(STATUS.AUTHORIZED).json({
                message: "You're not authenticated",
            });
        }
    }
}

export default authMiddleware