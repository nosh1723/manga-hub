import { Request, Response } from "express";
import STATUS from "../utils/status"
import { loginEmail, loginUsername, register } from "../validation/auth.validation";
import UserModel from "../models/User.schema";
import bcrypt from "bcrypt";
import jwt, { VerifyErrors } from "jsonwebtoken";
import sendToMail from "../mail/mailConfig";
import CodeModel from "../models/Code.schema";
import { IUser, RequestModel } from "../interface/user";

interface PayloadToken {
    id: any;
    email: string;
    is_admin: boolean;
}

class AuthController {

    generateAccessToken = async (value: PayloadToken | object | string) => {
        return jwt.sign(value, process.env.SECRET_ACCESSTOKEN!, {
            expiresIn: "1d",
        });
    }

    generateRefreshToken = async (value: PayloadToken | object | string) => {
        return jwt.sign(value, process.env.SECRET_REFRESHTOKEN!, {
            expiresIn: "60d"
        })
    }

    register = async (req: Request, res: Response) => {
        try {
            const { error } = register.validate(req.body)

            if (error) {
                return res.status(STATUS.BAD_REQUEST).json({
                    message: error.details[0].message
                })
            }

            const { email, username, password } = req.body

            const existingUsername = await UserModel.findOne({ username })
            if (existingUsername) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'username',
                    message: "Username already exist"
                })
            }

            const existingEmail = await UserModel.findOne({ email })
            if (existingEmail) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'email',
                    message: "Email already exist"
                })
            }

            const hashPassword = await bcrypt.hash(password, 10)

            await UserModel.create({
                email,
                username,
                password: hashPassword
            })

            return res.status(STATUS.OK).json({
                status: STATUS.OK,
                message: "Successfully registered!"
            })
        } catch (error: any) {
            return res.status(STATUS.INTERNAL).json({
                message: error.message,
                error: true,
            });
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body
            let user: any
            if (username) {
                const { error } = loginUsername.validate({ username, password })
                if (error) {
                    return res.status(STATUS.BAD_REQUEST).json({
                        message: error.details[0].message
                    })
                }

                user = await UserModel.findOne({ username })
                if (!user)
                    return res.status(STATUS.BAD_REQUEST).json({
                        name: 'username',
                        message: "Invalid username or password",
                    });
            }
            if (email) {
                const { error } = loginEmail.validate({ email, password })
                if (error) {
                    return res.status(STATUS.BAD_REQUEST).json({
                        message: error.details[0].message
                    })
                }

                user = await UserModel.findOne({ email })
                if (!user)
                    return res.status(STATUS.BAD_REQUEST).json({
                        message: "Invalid email or password",
                    });
            }

            const isComparePass = await bcrypt.compare(
                password,
                user.password
            );

            if (!isComparePass) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'password',
                    message: "Invalid email or password",
                });
            }

            const accessToken = await this.generateAccessToken({
                id: user._id,
                email: user.email,
                is_admin: user.is_admin
            });
            const refreshToken = await this.generateRefreshToken({
                id: user._id,
                email: user.email,
                is_admin: user.is_admin
            });

            res.cookie("token", refreshToken, {
                maxAge: 1000 * 60 * 24 * 60 * 60, // 60d
                httpOnly: true,
                path: "/",
                secure: false,      // Chỉ hoạt động qua HTTPS
                sameSite: 'lax'
            });

            delete user._doc.password;

            return res.status(STATUS.OK).json({
                message: "Login successful",
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: user
            })
        } catch (error: any) {
            // console.log(error);
            return res.status(STATUS.INTERNAL).json({
                message: error.message,
                error: true,
            });
        }
    }

    refreshToken = async (req: Request, res: Response) => {
        try {
            const refreshToken = req.cookies.token
            if (!refreshToken) {
                return res.status(STATUS.AUTHENTICATOR).json({
                    message: "You are not logged in",
                });
            }

            jwt.verify(
                refreshToken,
                process.env.SECRET_REFRESHTOKEN!,
                async (err: VerifyErrors | null, data?: object | string) => {
                    if (err) {
                        return res.status(STATUS.AUTHORIZED).json({
                            message: err.message,
                        });
                    }
                    if (!data) return

                    const payload = {
                        id: (data as PayloadToken).id,
                        email: (data as PayloadToken).email,
                        is_admin: (data as PayloadToken).is_admin,
                    };

                    const newAccessToken = await this.generateAccessToken(payload);
                    const newRefreshToken = await this.generateRefreshToken(payload);

                    res.cookie("token", newRefreshToken, {
                        maxAge: 24 * 60 * 60 * 1000 * 60,
                        httpOnly: true,
                        path: "/",
                        sameSite: "lax",
                        secure: false,
                    });

                    return res.status(STATUS.OK).json({
                        message: "Token created successfully",
                        accessToken: newAccessToken,
                    });
                }
            )
        } catch (error: any) {
            console.log('refresh token error: ', error);
            return res.status(STATUS.INTERNAL).json({
                message: error.message,
                error: true,
            });
        }
    }

    logout = async (req: Request, res: Response) => {
        try {
            const refreshToken = req.cookies.token
            if (!refreshToken) {
                return res.status(STATUS.AUTHENTICATOR).json({
                    message: "You are not logged in",
                });
            }

            jwt.verify(
                refreshToken,
                process.env.SECRET_REFRESHTOKEN!,
                async (err: VerifyErrors | null) => {
                    if (err) {
                        return res.status(STATUS.AUTHORIZED).json({
                            message: err.message,
                        });
                    }

                    res.cookie("token", "", {
                        maxAge: 0,
                        httpOnly: true,
                        path: "/",
                        sameSite: "lax",
                        secure: false,
                    });

                    return res.status(STATUS.OK).json({
                        status: STATUS.OK,
                        message: "Logged out successfully"
                    });
                }
            )
        } catch (error: any) {
            console.log('log out error: ', error);
            return res.status(STATUS.INTERNAL).json({
                message: error.message,
                error: true,
            });
        }
    }

    forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'email',
                    message: "You have not entered a email"
                });
            }

            const user = await UserModel.findOne({ email })
            if (!user) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'email',
                    message: "Invalid email",
                });
            }

            const randomOtp = Math.floor(100000 + Math.random() * 900000);

            const data = {
                otp: randomOtp,
                email: user.email,
                full_name: user.username,
            };

            const checkTimeOtp = new Date()
            await sendToMail(user?.email, "Password verification code", data);
            checkTimeOtp.setMinutes(checkTimeOtp.getMinutes() + 5)

            const existingCode = await CodeModel.findOne({ email })
            if (existingCode) {
                await CodeModel.findOneAndUpdate(
                    {
                        email: existingCode.email,
                    },
                    {
                        userId: user._id,
                        email: user.email,
                        code: randomOtp,
                        expired: checkTimeOtp,
                        completed: false,
                    }
                );
            } else {
                await CodeModel.create({
                    userId: user._id,
                    email: user.email,
                    code: randomOtp,
                    expired: checkTimeOtp,
                    completed: false,
                });
            }

            return res.status(STATUS.OK).json({
                message: "Sent code successfully, please check your email",
            });
        } catch (error: any) {
            console.log('forgot password error: ', error);
            return res.status(STATUS.INTERNAL).json({
                message: error.message,
                error: true,
            });
        }
    }

    compareCode = async (req: Request, res: Response) => {
        try {
            const { code, email } = req.body;
            if (!code) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'code',
                    message: "You have not entered a code",
                });
            }
            if (!email) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'code',
                    message: "You have not entered a email",
                });
            }

            const user = await UserModel.findOne({ email })
            if (!user) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'code',
                    message: "Invalid email",
                });
            }

            const existingCode = await CodeModel.findOne({
                userId: user._id,
            });
            if (!existingCode) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'code',
                    message: "This code does not exist on the server",
                });
            }

            const checkTimeOtp = new Date()
            if (checkTimeOtp.getTime() > existingCode.expired.getTime()) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'code',
                    message: "The code has expired",
                });
            }

            const check = code === existingCode.code;
            if (!check) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'code',
                    message: "The code is incorrect",
                });
            }

            await CodeModel.findOneAndUpdate(
                {
                    email: existingCode.email,
                },
                {
                    completed: true,
                }
            );
            res.status(STATUS.OK).json({
                message: "Success",
                data: {
                    otp: existingCode.code,
                    email: existingCode.email,
                    userId: existingCode.userId,
                },
            });
        } catch (error: any) {
            console.log('compare otp code: ', error);
            return res.status(STATUS.INTERNAL).json({
                message: error.message,
                error: true,
            });
        }
    }

    updateForgotPassword = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;
            if (!password || !email) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'password',
                    message: "Invalid value",
                });
            }

            const user = await UserModel.findOne({
                email: email,
            });

            if (!user) {
                return res.status(STATUS.BAD_REQUEST).json({
                    name: 'password',
                    message: "User does not exits",
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            await UserModel.findOneAndUpdate(
                {
                    _id: user._id,
                },
                {
                    password: hashPassword,
                }
            );

            return res.status(STATUS.OK).json({
                message: "Updated password successfully",
            });
        } catch (error: any) {
            console.log('update forgot password: ', error);
            return res.status(STATUS.INTERNAL).json({
                message: error.message,
                error: true,
            });
        }
    }

    changePassword = async (req: Request, res: Response) => {
        try {
            const { email, oldPassword, newPassword } = req.body
            if (!email || !oldPassword || !newPassword) {
                return res.status(STATUS.BAD_REQUEST).json({
                    message: "Invalid value",
                });
            }

            const user = await UserModel.findOne({ email })
            if (!user) {
                return res.status(STATUS.BAD_REQUEST).json({
                    message: "User does not exits",
                });
            }

            const isComparePass = await bcrypt.compare(
                oldPassword,
                user.password
            );
            if (!isComparePass) {
                return res.status(STATUS.BAD_REQUEST).json({
                    message: "The password is incorrect",
                });
            }

            const hashPassword = await bcrypt.hash(newPassword, 10)
            await UserModel.findByIdAndUpdate(
                {
                    _id: user._id,
                },
                {
                    password: hashPassword,
                }
            )

            return res.status(STATUS.OK).json({
                message: "Changed password successfully",
            });
        } catch (error: any) {
            console.log('change password: ', error);
            return res.status(STATUS.INTERNAL).json({
                message: error.message,
                error: true,
            });
        }
    }

    currentUser = async (req: RequestModel, res: Response) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(STATUS.BAD_REQUEST).json({
                    message: "Token does not exist"
                })
            }
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, process.env.SECRET_ACCESSTOKEN!,
                async (err: VerifyErrors | null, data?: object | string) => {
                    if (err) {
                        return res.status(STATUS.AUTHORIZED).json({
                            message: err.message,
                        });
                    }

                    const user = await UserModel.findOne({ _id: (data as PayloadToken)?.id })

                    delete user?._doc.password;

                    return res.status(STATUS.OK).json(user)
                })

        } catch (error: any) {
            console.log('current user: ', error);
            return res.status(STATUS.INTERNAL).json({
                message: error.message,
                error: true,
            });
        }
    }
}

export default new AuthController()