import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { useAddPlaylist } from '@/hooks/useAddPlaylist'
import { getSizeImage } from '@/utils/format'
import { getSong, selectPlayList } from '@/store/slice/Player'
import { useAppSelector, useAppDispatch } from '@/hooks/useStore'
import { PlayCircleOutlined } from '@ant-design/icons'
import './index.less'

type Props = {
  currentRanking: number
  coverPic: string
  duration: string
  singer: string
  songId: number
  songName: string
  className: string
  album?: string
  albumId?: number
  hideAl: boolean
  singerId: number
}

const PlayListItem: React.FC<Props> = (props: Props) => {
  const { currentRanking, coverPic, duration, singer, songId, songName, className = '', album, albumId, hideAl, singerId } = props
  const playList = useAppSelector(selectPlayList).data
  const dispatch = useAppDispatch()
  const playMusic = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, isTo = false) => {
    // 如果不跳转,那么组织超链接的默认行为
    if (!isTo) e.preventDefault()
    dispatch(getSong({ id: songId, isPlay: true }))
  }
  const addPlaylist = useAddPlaylist(playList)
  const width = coverPic ? '258px' : '328px'
  return (
    <div className={`SongItemWrapper ${className}`}>
      <div className="song-item rank-count">{currentRanking}</div>
      {coverPic && (
        <Link to="/discover/song" className="song-item" onClick={e => playMusic(e, true)}>
          <img src={getSizeImage(coverPic, 50)} alt="" />
        </Link>
      )}
      <div className="song-item song-info" style={{ width: width }}>
        <div className="left-info">
          <PlayCircleOutlined className="font-active" onClick={e => playMusic(e)} />
          <a href="/play" onClick={e => playMusic(e)} className="text-nowrap">
            {songName}
          </a>
        </div>
        <div className="right-operator">
          <button className="sprite_icon2 btn addto" onClick={e => addPlaylist(e, songId)}></button>
        </div>
      </div>
      <div className="song-item duration">{duration}</div>
      <Link to={`/artist?id=${singerId}`} className="song-item singer">
        {singer}
      </Link>
      {album && !hideAl && (
        <Link to={`/album?id=${albumId}`} className="song-item album">
          {album}
        </Link>
      )}
    </div>
  )
}
export default memo(PlayListItem)
