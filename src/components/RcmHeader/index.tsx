import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import './index.less'
type Headers = {
  title: string
  keywords?: Array<any>
  moreLink?: string
  right?: any
  keywordClick?: (item: string, index?: number) => void
}
const RcmHeader: React.FC<Headers> = props => {
  const { title, keywords, keywordClick, moreLink, right } = props
  return (
    <div className="RcmHeaderWrapper sprite_02">
      <div className="left">
        <span className="title">{title}</span>
        <div className="keyword">
          {keywords &&
            keywords.map((item, index) => {
              return (
                <div className="item" key={item}>
                  <span className="link" onClick={() => keywordClick(item, index)}>
                    {item}
                  </span>
                  <span className="divider">|</span>
                </div>
              )
            })}
        </div>
      </div>
      <div className="right">
        {moreLink && <Link to={moreLink}>更多</Link>}
        {right ? right : <i className="icon sprite_02"></i>}
      </div>
    </div>
  )
}
export default memo(RcmHeader)
