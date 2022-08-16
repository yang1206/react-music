import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { useAddPlaylist } from '@/hooks/useAddPlaylist'
import { useAppSelector, useAppDispatch } from '@/hooks/useStore'
import { selectPlayList } from '@/store/slice/Player'
import { getSizeImage } from '@/utils/format'
import { getSong } from '@/store/slice/Player'
import { PlayCircleOutlined } from '@ant-design/icons'
import { message } from 'antd'
import './index.less'
const SongItem: React.FC<any> = props => {
  // props/state
  const {
    coverPic,
    // duration,
    singer,
    songId,
    songName,
    className = ''
  } = props
  // redux hook
  const dispatch = useAppDispatch()
  const playList = useAppSelector(selectPlayList).data
  // other function
  const playMusic = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, isTo = false) => {
    if (!isTo) e.preventDefault()
    dispatch(getSong(songId))
    // 播放音乐
    // document.getElementById('audio').autoplay = true
  }
  const addPlaylist = useAddPlaylist(playList, message)

  return (
    <div className={className + ' SongItemWrapper'} style={{ margin: '20px 0' }}>
      {coverPic && (
        <NavLink to="/discover/song" className="song-item" onClick={e => playMusic(e, true)}>
          <img src={getSizeImage(coverPic, 50)} alt="" />
        </NavLink>
      )}
      <div className="song-item song-info">
        <div className="left-info">
          <div className="singer-song">
            <a onClick={e => playMusic(e)} className="text-nowrap">
              {songName}
            </a>
            <br />
            <NavLink to="/discover/song" className="song-item singer" onClick={e => playMusic(e, true)}>
              {singer}
            </NavLink>
          </div>
        </div>
        <div className="right-operator">
          <PlayCircleOutlined className="font-active" onClick={e => playMusic(e)} />
          <button className="sprite_icon2 btn addto" onClick={e => addPlaylist(e, songId)}></button>
        </div>
      </div>
    </div>
  )
}

export default memo(SongItem)
