import { Elysia, t } from "elysia";
import services from "../services/horo-services"
import { AppError } from "../utils/app-error";

const router = new Elysia({prefix: "/users"})
    .post("/add", async ({body, set}) => {
        try {
            return await services.create(body);
        }
        catch (error) {
            if (error instanceof AppError) {
                set.status = error.status;
                return {error: error.message};
            }
            else {
                set.status = 520;
                return {error: "unknown error"};
            }
        }
    },
    {
        body: t.Object({
            nic: t.String(),
            name: t.String(),
            gender: t.String(),
            dob: t.String(),
            tob: t.String(),
            timezone: t.String()
        })
    }
    )

    .get("/", async ({ set }) => {
        try {
            return await services.fetch();
        }
        catch (error) {
            if (error instanceof AppError) {
                set.status = error.status;
                return {error: error.message};
            }
            else {
                set.status = 520;
                return {error: "unknown error"};
            }
        }
    })


export default router;