import envConfig from '@/config'
import { STATUS } from '@/lib/constants'
import { User } from '@/models/user'
import authService from '@/services/auth'
import { LoginEmailBodyType, LoginUsernameBodyType, RegisterResType } from '@/validation/auth'
import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import moment from 'moment'

type AuthState = {
    currentUser: User | null,
    accessToken: string | null,
    initUsername: LoginUsernameBodyType,
    initEmail: LoginEmailBodyType,
    isChangeLogin: boolean,
    isLoading: boolean,
    error: any,
    register: (values: { username: string, password: string, email: string }) => Promise<any>,
    login: (values: LoginUsernameBodyType | LoginEmailBodyType) => Promise<void>,
    logout: () => Promise<any>,
    getCurrentUser: (header?: HeadersInit | undefined) => Promise<void>,
    refreshToken: (accessToken: string | null) => Promise<void>,
    setAccessToken: (accessToken: string | null) => void,
    getAccessToken: VoidFunction,
    setChangeLogin: (isChangeLogin: boolean) => void
}

const useAuthStore = create<AuthState>((set, get) => ({
    currentUser: null,
    accessToken: null,
    initUsername: {
        username: '',
        password: ''
    },
    initEmail: {
        email: '',
        password: ''
    },
    isChangeLogin: false,
    isLoading: false,
    error: '',

    register: async (values) => {
        try {
            set({ isLoading: true })
            const newValues = {
                username: values.username,
                email: values.email,
                password: values.password
            }

            const res = await authService.register(newValues)
            if (res?.status !== 200) return
            set({
                initEmail: {
                    email: values?.email,
                    password: values.password
                },
                initUsername: {
                    username: values.username,
                    password: values.password
                }
            })
            return res
        } catch (error: any) {
            set({ error: error.payload });
        } finally {
            set({ isLoading: false })
        }
    },

    login: async (values) => {
        try {
            set({ isLoading: true, error: null })
            const res = await authService.login(values)

            if (!res) return
            const header = { 'Authorization': 'Bearer ' + res.payload.accessToken }
            get().setAccessToken(res.payload.accessToken)
            await get().getCurrentUser(header)

            set({
                initUsername: {
                    username: '',
                    password: ''
                },
                initEmail: {
                    email: '',
                    password: ''
                }
            })
        } catch (error: any) {
            set({ error: error.payload });
        } finally {
            set({ isLoading: false })
        }
    },

    getCurrentUser: async (header?: HeadersInit | undefined) => {
        try {
            set({ isLoading: true })
            if (get().accessToken) {
                const res = header ? await authService.getCurrentUser(header) : await authService.getCurrentUser()

                set({ currentUser: res?.payload })
            }
        } catch (error: any) {
            set({ error: error.payload });
        } finally {
            set({ isLoading: false })
        }
    },

    setAccessToken: async (accessToken: string | null) => {
        set({ accessToken: accessToken })
        if (accessToken) {
            localStorage.setItem('token', accessToken!)
        }
    },

    getAccessToken: () => {
        if (typeof window !== 'undefined') {
            set({ accessToken: localStorage.getItem('token') })
        }
    },

    setChangeLogin: (isChangeLogin: boolean) => {
        set({ isChangeLogin: isChangeLogin })
    },

    logout: async () => {
        try {
            const res = await authService.logout()
            if (res.status !== STATUS.OK) return
            localStorage.removeItem('token')
            set({ currentUser: null, })
            return res
        } catch (error: any) {
            set({ error: error.payload })
        }
    },

    refreshToken: async (accessToken: string | null) => {
        try {
            const decoded = jwtDecode(accessToken as string);
            const checkTokenTime = new Date()
            const exp = new Date(decoded.exp! * 1000)
            
            if (moment(exp).diff(moment(checkTokenTime), 'hours') < 2) { //< 2h -> run refresh 
                const res = await fetch(envConfig.NEXT_PUBLIC_API_ENDPOINT + "/auth/refresh-token", {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                })
                const accessToken = await res.json()
                localStorage.setItem('token', accessToken?.accessToken)
            }
        } catch (error: any) {
            set({error: error.payload})
        }
    }
}))

export default useAuthStore