// lib/bazi.js

import { solarToLunar, getGanzhiYear, getGanzhiMonth, getGanzhiDay } from 'bazi-js';

export function getBazi(datetime, timezone = 8) {
  const date = new Date(datetime);
  const lunar = solarToLunar(date, timezone);

  const yearPillar = getGanzhiYear(lunar);
  const monthPillar = getGanzhiMonth(lunar);
  const dayPillar = getGanzhiDay(date, timezone);

  return {
    datetime,
    timezone,
    yearPillar,
    monthPillar,
    dayPillar,
  };
}
