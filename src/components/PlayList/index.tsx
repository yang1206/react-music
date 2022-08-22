import React, { memo } from 'react'
import { formatMinuteSecond } from '@/utils/format'
import PlayListItem from './components/PlayListItem'
import './index.less'
type Props = {
  playlist: Array<any>
}
const PlayList: React.FC<Props> = (props: Props) => {
  const playlist = props.playlist
  return (
    <div className="PlaylistWrapper">
      <div className="main-header">
        <div className="sprite_table header-item"></div>
        <div className="sprite_table header-item header-title">标题</div>
        <div className="sprite_table header-item header-time">时长</div>
        <div className="sprite_table header-item header-singer">歌手</div>
      </div>
      <div className="main-list">
        {playlist &&
          playlist.map((item, index) => {
            return (
              <PlayListItem
                key={item.id}
                currentRanking={index + 1}
                className="song_item"
                coverPic={index < 3 ? item.al.picUrl : ''}
                duration={formatMinuteSecond(item.dt)}
                songName={item.name}
                singer={item.ar[0].name}
                songId={item.id}
              />
            )
          })}
      </div>
    </div>
  )
}
export default memo(PlayList)
