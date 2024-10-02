import { Request, Response } from "express"
import STATUS from "../utils/status"


class AuthController {
    async register(req: Request, res: Response) {
        res.status(STATUS.OK).json("hihi")
    }
}

export default new AuthController()