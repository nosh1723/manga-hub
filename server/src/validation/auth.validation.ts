import Joi from "joi";

export const register = Joi.object({
    username: Joi.string().required().messages({
        "any.required": "You have not entered a username"
    }),
    password: Joi.string().required().min(6).messages({
        "any.required": "You have not entered a password",
        "string.min": "Password must contain at least 6 digits"
    }),
    email: Joi.string().email().required().messages({
        "any.required": "You have not entered a email",
        "string.email": "Invalid email format"
    })
})

export const loginEmail = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "You have not entered a email",
        "string.email": "Invalid email format"
    }),
    password: Joi.string().required().min(6).messages({
        "any.required": "You have not entered a password",
        "string.min": "Password must contain at least 6 digits"
    })
})

export const loginUsername = Joi.object({
    username: Joi.string().required().messages({
        "any.required": "You have not entered a username"
    }),
    password: Joi.string().required().min(6).messages({
        "any.required": "You have not entered a password",
        "string.min": "Password must contain at least 6 digits"
    })
})