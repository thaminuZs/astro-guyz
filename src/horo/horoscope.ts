import swe from "../swisseph-conf/swisseph";

function getJulianDate(date: string, time: string): number {
    const [year, month, day] = date.split("-").map(Number);
    const [hour, min] = time.split(":").map(Number);

    const h = hour + min / 60;

    return swe.swe_julday(year, month, day, hour, swe.SE_GREG_CAL);
}

function getMoonLongtitude(jdate: number): number {
    const res = swe.swe_calc_ut(jdate, swe.SE_MOON, swe.SEFLG_SWIEPH) as 
    { longitude: number; latitude: number; distance: number; error?: string; };

    if (res.error) {
        throw new Error(res.error);
    }

    return res.longitude;
}

export function getRashi(longitude: number): string {
  const astroSigns = [
    "Mesha", "Vrushabha", "Mithuna", "Kataka", "Sinha", "Kanya",
    "Thula", "Vrushchika", "Dhanu", "Makara", "Kumbha", "Meena"
  ];
  return astroSigns[Math.floor(longitude / 30)];
}

export function getNakshatra(longitude: number): string {
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
    