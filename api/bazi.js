export default function handler(req, res) {
  try {
    const { year, month, day } = req.query;

    if (!year || !month || !day) {
      return res.status(400).json({ error: '缺少 year、month 或 day 參數' });
    }

    // 補零格式：例如 3 → "03"
    const pad = (num) => String(num).padStart(2, '0');

    // 組成 ISO 格式字串（保證正確）
    const dateStr = `${year}-${pad(month)}-${pad(day)}T00:00:00+08:00`;
    const date = new Date(dateStr);

    if (isNaN(date)) {
      return res.status(400).json({ error: '無效日期格式' });
    }

    const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

    // 年柱（以立春切換）
    const liChun = new Date(`${year}-02-04T00:00:00+08:00`);
    const adjustedYear = date < liChun ? year - 1 : parseInt(year);
    const yearStemIndex = (adjustedYear - 4) % 10;
    const yearBranchIndex = (adjustedYear - 4) % 12;
    const yearPillar = heavenlyStems[yearStemIndex] + earthlyBranches[yearBranchIndex];

    // 日柱（以 1900-01-31 為基準）
    const baseDate = new Date("1900-01-31T00:00:00+08:00");
    const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    const dayStemIndex = (diffDays + 60) % 10;
    const dayBranchIndex = (diffDays + 60) % 12;
    const dayPillar = heavenlyStems[dayStemIndex] + earthlyBranches[dayBranchIndex];

    // 月柱（簡化計算）
    const monthIndex = (date.getMonth() + 1 + 10) % 12;
    const monthStemIndex = (yearStemIndex * 2 + monthIndex) % 10;
    const monthBranchIndex = (monthIndex + 1) % 12;
    const monthPillar = heavenlyStems[monthStemIndex] + earthlyBranches[monthBranchIndex];

    res.status(200).json({
      year: yearPillar,
      month: monthPillar,
      day: dayPillar
    });

  } catch (err) {
    res.status(500).json({ error: '內部錯誤', details: err.message });
  }
}

