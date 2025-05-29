import { toLunar, getGanzhi } from 'lunar-javascript'
import { NextResponse } from 'next/server'

const ganzhi60 = [
  '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
  '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
  '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
  '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
  '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
  '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'
]

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const year = parseInt(searchParams.get('year'))
  const month = parseInt(searchParams.get('month'))
  const day = parseInt(searchParams.get('day'))

  if (!year || !month || !day) {
    return NextResponse.json({ error: '缺少 year、month 或 day 參數' }, { status: 400 })
  }

  // 台灣時區處理：以子初（午夜）換日
  const date = new Date(Date.UTC(year, month - 1, day, 16)) // UTC+8 = +8 小時 = +16:00 前一日 16:00
  const lunar = toLunar(date)

  // 各柱天干地支
  const yearGanzhi = lunar.getYearInGanZhi()
  const monthGanzhi = lunar.getMonthInGanZhi()
  const dayGanzhi = lunar.getDayInGanZhi()

  // 傳統日柱編號（甲子 = 1）
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
