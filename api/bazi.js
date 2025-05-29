import { NextResponse } from 'next/server'

// 支援 CommonJS 套件載入
const lunar = require('lunar-javascript')
const ganzhi60 = [
  '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
  '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
  '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
  '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
  '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
  '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'
]

export const config = {
  runtime: 'nodejs' // 確保使用 Node.js 而非 Edge Runtime
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const year = parseInt(searchParams.get('year'))
  const month = parseInt(searchParams.get('month'))
  const day = parseInt(searchParams.get('day'))

  if (!year || !month || !day) {
    return NextResponse.json({ error: '缺少 year、month 或 day 參數' }, { status: 400 })
  }

  const date = new Date(Date.UTC(year, month - 1, day, 16)) // 台灣時區換日點
  const lunarDate = lunar.Lunar.fromDate(date)

  const yearGanzhi = lunarDate.getYearInGanZhi()
  const monthGanzhi = lunarDate.getMonthInGanZhi()
  const dayGanzhi = lunarDate.getDayInGanZhi()

  const dayIndex = ganzhi60.indexOf(dayGanzhi)
  const traditionalDayNumber = dayIndex >= 0 ? dayIndex + 1 : null

  const result = {
    year: `${yearGanzhi}（${ganzhi60.indexOf(yearGanzhi) + 1}）`,
    month: `${monthGanzhi}`,
    day: `${dayGanzhi}（${traditionalDayNumber}）`,
    full: `年柱: ${yearGanzhi}（${ganzhi60.indexOf(yearGanzhi) + 1}），月柱: ${monthGanzhi}，日柱: ${dayGanzhi}（${traditionalDayNumber}）`
  }

  return NextResponse.json(result)
}
