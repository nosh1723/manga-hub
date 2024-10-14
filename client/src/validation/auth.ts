import z from 'zod'

export const RegisterRes = z.object({
    message: z.string()
})

export const RegisterBody = z
    .object({
        username: z.string({ required_error: "Must not be empty" }).min(6, {
            message: "Username must be at least 6 characters.",
        }),
        email: z.string({ required_error: "Must not be empty" }).email(),
        password: z.string({ required_error: "Must not be empty" }).min(6).max(100)
    })
    .strict()

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginRes = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    user: z.object({
        _id: z.number(),
        username: z.string(),
        email: z.string(),
        is_admin: z.boolean()
    }),
    message: z.string()
})

export const LoginEmailBody = z
    .object({
        email: z.string().min(1, {message: "Email is required"}).email(),
        password: z.string().min(1, {message: "Password is required"}).min(6, {message: "Password must contain at least 6 character(s)"}).max(100)
    })
    .strict()

export const LoginUsernameBody = z
    .object({
        username: z.string().min(1, {message: "Username is required"}),
        password: z.string().min(1, {message: "Password is required"}).min(6, {message: "Password must contain at least 6 character(s)"}).max(100)
    })
    .strict()

export type LoginEmailBodyType = z.TypeOf<typeof LoginEmailBody>

export type LoginUsernameBodyType = z.TypeOf<typeof LoginUsernameBody>

export type LoginResType = z.TypeOf<typeof LoginRes>