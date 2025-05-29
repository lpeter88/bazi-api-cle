// api/bazi.js
const { Lunar } = require('lunar-javascript');

const ganZhi60 = [
  '甲子','乙丑','丙寅','丁卯','戊辰','己巳','庚午','辛未','壬申','癸酉',
  '甲戌','乙亥','丙子','丁丑','戊寅','己卯','庚辰','辛巳','壬午','癸未',
  '甲申','乙酉','丙戌','丁亥','戊子','己丑','庚寅','辛卯','壬辰','癸巳',
  '甲午','乙未','丙申','丁酉','戊戌','己亥','庚子','辛丑','壬寅','癸卯',
  '甲辰','乙巳','丙午','丁未','戊申','己酉','庚戌','辛亥','壬子','癸丑',
  '甲寅','乙卯','丙辰','丁巳','戊午','己未','庚申','辛酉','壬戌','癸亥'
];

module.exports = async (req, res) => {
  try {
    // 解析 query
    const url = new URL(req.url, `https://${req.headers.host}`);
    const dateStr = url.searchParams.get('date');    // YYYY-MM-DD
    const hour    = parseInt(url.searchParams.get('hour'), 10); // 小时整型

    if (!dateStr || isNaN(hour)) {
      return res.status(400).json({ error: '缺少 date 或 hour 参数' });
    }

    const [year, month, day] = dateStr.split('-').map(Number);
    // 以台湾时区子初（UTC 16:00）换日
    const date = new Date(Date.UTC(year, month - 1, day, hour));
    const lunarDate = Lunar.fromDate(date);

    const dayGanZhi = lunarDate.getDayInGanZhi();          // e.g. "乙未"
    const idx = ganZhi60.indexOf(dayGanZhi);
    const ganZhiIndex = idx >= 0 ? idx + 1 : null;         // 1–60

    return res.status(200).json({
      dayGanZhi,
      ganZhiIndex
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
};
