import { Document, Types } from "mongoose";

interface MongooseDocument extends Document<Types.ObjectId> {
    _doc: any;
}

export interface IUser extends MongooseDocument {
    username: string;
    email: string;
    password: string;
    avatar: string;
    is_admin: boolean;
    birth_day: string;
}