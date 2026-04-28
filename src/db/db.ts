import mongoose from "mongoose";

export const dbConnection = async () => {
    const mongoUri = String(process.env.MONGO_URI);

    try {
        const conn = await mongoose.connect(mongoUri);
        console.log(`db connected ${conn.connection.host}`);
    }
    catch (err) {
        console.log(`db connection error ${err}`);
        process.exit(1);
    }
}