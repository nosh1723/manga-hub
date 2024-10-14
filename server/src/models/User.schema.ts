import mongoose from "mongoose";
import { IUser } from "../interface/user";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 6,
        unique: true,
        required: true
    },
    email: {
        type: String,
        min: 10,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    avatar: {
        type: String
    },
    birth_day: {
        type: String
    },
    is_admin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const UserModel = mongoose.model<IUser>("User", UserSchema)

export default UserModel