import { userModel } from "../models/user-horoscope";
import { AppError } from "../utils/app-error";

type userDTO = {
    nic: string,
    name: string,
    gender: string,
    dob: string,
    tob: string,
    timezone: string
}

const horoPort = process.env.HORO_PORT;

export default {
    create: async (data: userDTO) => {
        if (!data) {
            throw new AppError("enter valid data");
        }
        if (!data.nic || !data.gender || !data.dob || !data.tob) {
            throw new AppError("reqirements not met");
        }
        const existUser = await userModel.findOne({nic: data.nic});
        if (existUser) {
            throw new AppError("user already exists");
        }

        const res = await fetch(`http://localhost:${horoPort}?dob=${data.dob}&tob=${data.tob}&zone=${data.timezone}`);
        const userData = await res.json() as {lagna?: string, rashi?: string, nakshatra?: string, error?: string};

        if (!userData.error) {
            const user = {
                nic: data.nic,
                name: data.name,
                gender: data.gender,
                birth: {
                    dob: data.dob,
                    tob: data.tob,
                    timezone: data.timezone,
                },
                horo: {
                    lagna: userData.lagna,
                    rashi: userData.rashi,
                    nakshatra: userData.nakshatra
                }
            };

            try {
                const savedUser = await userModel.create(user);
                return savedUser;
            }
            catch (err) {
                throw new AppError("internal server error", 501);
            }
        }
        else {
            throw new AppError("horoscope fetch error", 501);
        }
        
    },

    fetch: async () => {
        try {
            const users = await userModel.find();
            return users;
        }
        catch (err) {
            throw new AppError("internal server error", 501);
        }
    }
}