import swe from "../swisseph-conf/swisseph.js";

export function getJulianDate(date, time) {
    const [year, month, day] = date.split("-").map(Number);
    const [hour, min] = time.split(":").map(Number);

    const h = hour + min / 60;

    return swe.swe_julday(year, month, day, hour, swe.SE_GREG_CAL);
}

export function getMoonLongtitude(jdate) {
    const res = swe.swe_calc_ut(jdate, swe.SE_MOON, swe.SEFLG_SWIEPH);

    if (res.error) {
        throw new Error(res.error);
    }

    return res.longitude;
}

export function getLagna(jdate, lat=6.9271, lon=79.8612) {
  const res = swe.swe_houses(jdate, lat, lon);

  if (res.error) {
    throw new Error(res.error);
  }

  const astroSigns = [
    "Mesha", "Vrushabha", "Mithuna", "Kataka", "Sinha", "Kanya",
    "Thula", "Vrushchika", "Dhanu", "Makara", "Kumbha", "Meena"
  ];

  const ascDegree = res.ascendant;
  const signIndex = Math.floor(ascDegree / 30);
  return astroSigns[signIndex];
}

export function getRashi(longitude) {
  const astroSigns = [
    "Mesha", "Vrushabha", "Mithuna", "Kataka", "Sinha", "Kanya",
    "Thula", "Vrushchika", "Dhanu", "Makara", "Kumbha", "Meena"
  ];
  return astroSigns[Math.floor(longitude / 30)];
}

export function getNakshatra(longitude) {
  const nakshatraSign = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
    "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha",
    "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha",
    "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
    "Uttara Bhadrapada", "Revati"
  ];

  const index = Math.floor(longitude / (360 / 27));
  return nakshatraSign[index];
}
    