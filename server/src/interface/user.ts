import { Request } from "express";
import { Document, ObjectId, Types } from "mongoose";

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

export interface RequestModel extends Request {
    user?: {
      id: ObjectId;
      is_admin: boolean;
      email: string;
    };
  }