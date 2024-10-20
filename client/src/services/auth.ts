import http from "@/lib/http";
import { User } from "@/models/user";
import { LoginEmailBodyType, LoginResType, LoginUsernameBodyType, RegisterBodyType, RegisterResType } from "@/validation/auth";


const authService = {
    auth: (body: {accessToken: string, refreshToken: string}) => http.post('api/auth', body, {baseUrl: ''}), 
    login: (body: LoginUsernameBodyType | LoginEmailBodyType) => http.post<LoginResType>('auth/login', body),
    register: (body: RegisterBodyType) => http.post<RegisterResType>('auth/register', body),
    refreshToken : () => http.post('auth/refresh-token'),
    getCurrentUser: (header?: HeadersInit | undefined) => http.get<User>('auth/current-user', {headers: header ? header : undefined}) ,
    logout: () => http.post('auth/logout'),


    forgotPassword: (body: {email: string}) => http.post('auth/forgot-password', body),
    comparePassword: (body: {email: string, code: string}) => http.post('auth/compare-code', body),
    updateForgotPassword: (body: {email: string, password: string}) => http.post('auth/update-forgot-password', body),
} 

export default authService