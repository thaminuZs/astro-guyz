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
        type: {
            dob: {
                type: String,
                required: true
            },
            tob: {
                type: String,
                required: true
            },
            timezone: {
                type: String,
                default: "Asia/Colombo"
            }
        },
        required: true
    },
    horo: {
        type: {
            lagna: {
                type: String,
                default: ""
            },
            rashi: {
                type: String,
                default: ""
            },
            nakshatra: {
                type: String,
                default: ""
            }
        },
        required: true
    }
});

type User = InferSchemaType<typeof userSchema>;

export const userModel = model<User>("user", userSchema);