import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { useAddPlaylist } from '@/hooks/useAddPlaylist'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectPlayList, getSong } from '@/store/slice/Player'
import { getSizeImage } from '@/utils/format'
import { PlayCircleOutlined } from '@ant-design/icons'
import './index.less'
interface Props {
  currentRanking: number
  coverPic?: string
  duration: string
  singer: string
  songId: number
  className?: string
  songName: string
}
const SongItem: React.FC<Props> = props => {
  const { currentRanking, coverPic, duration, singer, songId, songName, className = '' } = props
  const dispatch = useAppDispatch()
  const playlist = useAppSelector(selectPlayList).data
  const playMusic = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, isTo = false) => {
    // 如果不跳转,那么组织超链接的默认行为
    if (!isTo) e.preventDefault()
    dispatch(getSong({ id: songId, isPlay: true }))
  }
  const addPlaylist = useAddPlaylist(playlist)
  const infoWidth = coverPic ? '258px' : '328px'
  return (
    <div className={`TopSongItemWrapper ${className}`}>
      <div className="song-item rank-count">{currentRanking}</div>
      {coverPic && (
        <NavLink to="/discover/song" className="song-item" onClick={e => playMusic(e, true)}>
          <img src={getSizeImage(coverPic, 50)} alt="" />
        </NavLink>
      )}
      <div className="song-item song-info" style={{ width: infoWidth }}>
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
      <NavLink to="/discover/song" className="song-item singer" onClick={e => playMusic(e, true)}>
        {singer}
      </NavLink>
    </div>
  )
}
export default memo(SongItem)
