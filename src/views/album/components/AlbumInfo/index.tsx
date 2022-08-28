import { memo } from 'react'
import { Skeleton } from 'antd'
import { getSizeImage, parseTime } from '@/utils/format'
import RcmHeader from '@/components/RcmHeader'
import PlayList from '@/components/PlayList'
import './index.less'
interface Props {
  albumDetail: any
}
const AlbumInfo: React.FC<Props> = (props: Props) => {
  const { albumDetail } = props
  const coverPicUrl = albumDetail && albumDetail.album.blurPicUrl
  const headerTitle = albumDetail && albumDetail.album.name
  const artistName = albumDetail && albumDetail.album.artist && albumDetail.album.artist.name
  const ReleaseDate = albumDetail && albumDetail.album.publishTime && parseTime(albumDetail.album.publishTime, '{y}-{m}-{d}')
  const description = albumDetail && albumDetail.album.description
  const shareCount = albumDetail && albumDetail.album.info.shareCount
  const commentCount = albumDetail && albumDetail.album.info.commentCount
  const company = albumDetail && albumDetail.album.company
  const playlist = albumDetail && albumDetail.songs
  return (
    <div className="AlbumDetailWrapper">
      {!albumDetail && <Skeleton active />}
      {/* 专辑详情头部 */}
      <div className="AlbumTitleWrapper">
        <div className="title-image">
          <img src={getSizeImage(coverPicUrl, 177)} alt="" />
          <div className="sprite_cover msk"></div>
        </div>
        <div className="title-info">
          <h2>{headerTitle}</h2>
          <div className="info">
            歌手: <a className="artist">{artistName}</a>
          </div>
          <div className="info">发行日期: {ReleaseDate}</div>
          <div className="info">发行公司: {company}</div>
          <div className="controls">
            <div className="sprite_button play">
              <i className="sprite_button inner">
                <em className="sprite_button play-icon"></em>
                播放
              </i>
            </div>
            <div className="sprite_button favorite">
              <i className="sprite_button inner">
                <em className="sprite_button favorite-icon"></em>(收藏)
              </i>
            </div>
            <div className="sprite_button share">
              <i className="sprite_button inner">
                <em className="sprite_button favorite-icon"></em>({shareCount})
              </i>
            </div>
            <div className="sprite_button download">
              <i className="sprite_button inner">
                <em className="sprite_button favorite-icon"></em>
                下载
              </i>
            </div>
            <div className="sprite_button comment">
              <i className="sprite_button inner">
                <em className="sprite_button favorite-icon"></em>({commentCount})
              </i>
            </div>
          </div>
          <div className="description">
            <p style={{ fontWeight: '600' }}>专辑介绍:</p>
            <details className="description-details">
              <summary>介绍:{description && description.slice(0, 150)}</summary>
              {description && description.slice(150)}
            </details>
          </div>
        </div>
      </div>
      {/* 歌单详情音乐列表 */}
      <div className="MainDetail">
        <RcmHeader title="包含歌曲列表" right={<span>{playlist && playlist.length}首歌</span>} />
        {playlist && <PlayList playlist={playlist} />}
      </div>
    </div>
  )
}
export default memo(AlbumInfo)
