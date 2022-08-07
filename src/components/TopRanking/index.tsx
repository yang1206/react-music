import React, { memo } from 'react'
import { getSizeImage } from '@/utils/format'
import { Recommend } from '@/store/interface/recommend'
import './index.less'
interface Props {
  info: Recommend.topItem
}
const TopRanking: React.FC<Props> = props => {
  const { info } = props
  const { tracks = [] } = info
  return (
    <div className="TopRankingWrapper">
      <div className="header">
        <div className="image">
          <img src={getSizeImage(info.coverImgUrl)} alt="" />
          <a href="/todo" className="image_cover">
            ranking
          </a>
        </div>
        <div className="info">
          <a href="/todo">{info.name}</a>
          <div>
            <button className="btn play sprite_02"></button>
            <button className="btn favor sprite_02"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div key={item.id} className="list-item">
              <div className="rank">{index + 1}</div>
              <div className="info">
                <span className="name text-nowrap">{item.name}</span>
                <div className="operate">
                  <button className="btn sprite_02 play" /*onClick={e => playMusic(item)}*/></button>
                  <button className="btn sprite_icon2 addto"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="/todo">查看全部 &gt;</a>
      </div>
    </div>
  )
}

export default memo(TopRanking)