import React, { memo } from 'react'
import { getSizeImage, getCount } from '@/utils/format'
import './index.less'

const SongCover = (props: any) => {
  const { info, right } = props
  const margin = `20px ${right} 20px 0`
  return (
    <div className="SongCoverWrapper" style={{ margin: margin }}>
      <div className="cover-top">
        <img src={getSizeImage(info.picUrl || info.coverImgUrl, 140)} alt="" />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon ej"></i>
              {getCount(info.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">{info.name}</div>
      {/* <div className="cover-source">by {info.copywriter || info.creator.name}</div> */}
    </div>
  )
}

export default memo(SongCover)