// api/bazi.js
const { Lunar } = require('lunar-javascript');

module.exports = async (req, res) => {
  try {
    // 解析 query
    const url = new URL(req.url, `https://${req.headers.host}`);
    const dateStr = url.searchParams.get('date');
    const hour = parseInt(url.searchParams.get('hour'), 10);

    if (!dateStr || isNaN(hour)) {
      return res.status(400).json({ error: '缺少 date 或 hour 參數' });
    }

    const [year, month, day] = dateStr.split('-').map(Number);
    // 子初换日（UTC 16:00 = 台灣隔日 00:00）
    const date = new Date(Date.UTC(year, month - 1, day, hour));
    const lunar = Lunar.fromDate(date);

    const dayGanZhi = lunar.getDayInGanZhi();            // 干支日
    const dayIndex = lunar.getDayGanZhiIndex();          // 1 = 甲子, …, 60 = 癸亥

    return res.status(200).json({
      dayGanZhi,
      ganZhiIndex: dayIndex
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
};
