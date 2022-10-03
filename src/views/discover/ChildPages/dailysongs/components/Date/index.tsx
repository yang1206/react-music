import React from 'react'
import { parseTime } from '@/utils/format'
import './index.less'
const DateHeader: React.FC = () => {
  const day = parseTime(new Date(), '{d}')
  const week = `星期${'日一二三四五六'.charAt(new Date().getDay())}`
  return (
    <div className="DateWrapper date">
      <div className="head">{week}</div>
      <div className="day">{day}</div>
      <div className="mask date"></div>
    </div>
  )
}
export default DateHeader
