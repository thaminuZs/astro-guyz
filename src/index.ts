import { Elysia } from "elysia";
import dotenv from "dotenv";
import { dbConnection } from "./db/db";
import router from "./routes/horo-routes";

dotenv.config();
const app = new Elysia();
const PORT = Number(process.env.PORT) || 3000;

app.use(router);

dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`app is on ${PORT}`);
    });
});


