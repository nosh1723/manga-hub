import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        expired: {
            type: Date,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const CodeModel = mongoose.model("Code", CodeSchema)

export default CodeModel