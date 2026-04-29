import express from "express";
import { getJulianDate, getMoonLongtitude, getRashi, getNakshatra, getLagna } from "./horo/horoscope.js";

const PORT = process.env.HORO_PORT;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    const { dob, tob, zone } = req.query;

    try {
        const jday = getJulianDate(dob, tob);
        const longitude = getMoonLongtitude(jday);

        const rashi = getRashi(longitude);
        const nakshatra = getNakshatra(longitude);
        const lagna = getLagna(jday);

        res.status(200).json({lagna: lagna, rashi: rashi, nakshatra: nakshatra});
    }
    catch {
        res.status(400).json({error: "server error"});
    }
});

app.listen(PORT, () => {
    console.log(`horo microservice on ${PORT}`);
});