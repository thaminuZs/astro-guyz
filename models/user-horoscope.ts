import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema({
    nic: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: "user"
    },
    gender: {
        type: String,
        required: true
    },
    birth: {
        bdt: {
            type: Date,
            required: true
        },
        timezone: {
            type: String,
            default: "Asia/Colombo"
        }
    }
});

type User = InferSchemaType<typeof userSchema>;

export const userModel = model<User>("user", userSchema);