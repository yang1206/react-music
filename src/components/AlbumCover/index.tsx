import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSizeImage } from '@/utils/format'
import { Recommend } from '@/store/interface/recommend'
import './index.less'
//定义props类型
interface Props {
  info: Recommend.NewAlbums
  size: string
  width: string
  bgp: string
}
const AlbumCover: React.FC<Props> = (props: any) => {
  const { info, size, width, bgp } = props
  // 接收父组件传来的样式
  const navigate = useNavigate()
  const toAlbumDetail = () => {
    navigate(`/album?id=${info.id}`, {
      replace: false
    })
  }
  return (
    <div className="AlbumWrapper" style={{ width: width, height: size }}>
      <div className="album-image" onClick={() => toAlbumDetail()}>
        <img src={getSizeImage(info.picUrl, 180)} style={{ width: size, height: size }} alt=""></img>
        <a className="cover sprite_cover" style={{ backgroundPosition: `0  ${bgp}` }}>
          {info.name}
        </a>
      </div>
      <div className="album-info" style={{ width: size }}>
        <a className="name" onClick={() => toAlbumDetail()}>
          {info.name}
        </a>
        <a className="artist">{info.artist.name}</a>
      </div>
    </div>
  )
}

export default memo(AlbumCover)
