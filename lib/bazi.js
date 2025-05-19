import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

// 天干與地支對照表
const HeavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EarthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 取得干支
function getStemBranch(offset) {
  const stem = HeavenlyStems[offset % 10];
  const branch = EarthlyBranches[offset % 12];
  return stem + branch;
}

export function getBaZiPillars(datetimeStr, timezoneOffset = 8) {
  const dt = dayjs.tz(datetimeStr, 'Asia/Taipei');

  const year = dt.year();
  const month = dt.month() + 1;
  const day = dt.date();

  // 假設簡化算法（非精準農曆算法，只供測試用）
  const yearPillar = getStemBranch(year - 1984);      // 1984 為甲子年
  const monthPillar = getStemBranch(month + (year - 2000));  // 簡化月柱算法
  const dayPillar = getStemBranch(dt.diff(dayjs(`${year}-01-01`), 'day'));

  return {
    datetime: datetimeStr,
    timezone: timezoneOffset,
    yearPillar,
    monthPillar,
    dayPillar
  };
}
