import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSizeImage } from '@/utils/format'

import './index.less'
interface Props {
  coverPic: string
  singer: string
  id: number
}

const ArtistCover: React.FC<Props> = ({ coverPic, singer, id }: Props) => {
  const picUrl = (coverPic && getSizeImage(coverPic, 140)) || 'https://gitee.com/xmkm/cloudPic/raw/master/img/20210505140847.png'
  const navigate = useNavigate()
  const toArtist = () => {
    navigate(`/artist?id=${id}`, {
      replace: false
    })
  }
  return (
    <div className="SingerItemWrapper">
      <div
        className="cover-pic"
        onClick={() => {
          toArtist()
        }}
      >
        <img src={picUrl} alt="" />
        <span className="image_cover"></span>
      </div>
      <p className="singer-info">
        <a
          onClick={() => {
            toArtist()
          }}
        >
          {singer}
        </a>
        {/* <i className="sprite_icon2 singer_icon"></i> */}
      </p>
    </div>
  )
}
export default memo(ArtistCover)
