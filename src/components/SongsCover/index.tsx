import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSizeImage, getCount } from '@/utils/format'
import { Recommend } from '@/store/interface/recommend'
import './index.less'
interface Props {
  info: Recommend.perSonalizeder
  key?: number
}
const SongCover: React.FC<Props> = (props: any) => {
  const { info, right } = props
  const margin = `20px ${right} 20px 0`
  const navigate = useNavigate()
  const toDetail = (id: number) => {
    navigate(`/playlist?id=${id}`, {
      replace: false
    })
  }
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
      <a
        className="cover-bottom"
        onClick={() => {
          toDetail(info.id)
        }}
      >
        {info.name}
      </a>
      {/* <div className="cover-source">by {info.copywriter}</div> */}
    </div>
  )
}

export default memo(SongCover)
