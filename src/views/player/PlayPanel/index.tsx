import React, { memo } from 'react'
import { ClearOutlined, CloseOutlined, HeartOutlined } from '@ant-design/icons'
import PlayListItem from './components/PlayListItem'
import LyricContent from './components/LyricContent'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import {
  changePlayList,
  changePlayListCount,
  getSong,
  selectCurrentIndex,
  selectPlayList,
  selectSong,
} from '@/store/slice/Player'
import { removeAllSong } from '@/utils/storage'
import './index.less'

interface Props {
  showPanel: boolean
  playlistCount: number
  closeWindow: () => void
  playMusic: () => void
  changeSong: any
}
const PlayPanel: React.FC<Props> = (props: Props) => {
  const { showPanel, playlistCount, closeWindow, playMusic, changeSong }
    = props
  const dispatch = useAppDispatch()
  const currentSong = useAppSelector(selectSong).data
  const currentSongIndex = useAppSelector(selectCurrentIndex).data
  const playList = useAppSelector(selectPlayList).data

  // 清除全部歌曲
  const clearAllPlaylist = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault()
    removeAllSong()
    const newArr = [...playList]
    newArr.splice(0, playList.length)
    dispatch(changePlayList(newArr))
    dispatch(changePlayListCount(newArr.length))
  }
  // 点击item播放音乐
  const clickItem = (item: { id: number }) => {
    // 如果点击了当前播放的歌曲，则什么也不操作
    if (item.id === currentSong.id)
      return

    // 播放音乐 dispatch
    dispatch(getSong({ id: item.id, isPlay: true }))
    playMusic()
  }

  return (
    <div
      className="PanelWrapper"
      style={{ visibility: showPanel ? 'visible' : 'hidden' }}
    >
      <div className="SliderPlaylistHeader">
        <div className="playlist-header-left">
          <h3 className="header-title">播放列表({playlistCount})</h3>
          <div>
            <a
              href="/favorite"
              className="header-icon"
              onClick={e => e.preventDefault()}
            >
              <HeartOutlined />
              <span>收藏一下</span>
            </a>
            <a
              href="/clear"
              onClick={e => clearAllPlaylist(e)}
              className="header-icon"
            >
              <ClearOutlined />
              <span>清除播放列表</span>
            </a>
          </div>
        </div>
        <div className="playlist-header-right">
          <div className="song-name">{currentSong && currentSong.name}</div>
          <div className="close-window" onClick={closeWindow}>
            <CloseOutlined />
          </div>
        </div>
      </div>
      <div className="SliderPlaylistMain">
        <div className="main-playlist">
          {playList
            && playList.map((item, index) => {
              return (
                <PlayListItem
                  key={index}
                  isActive={(currentSongIndex || 0) === index ? 'active' : ''}
                  songName={item.name}
                  singer={item.ar[0].name}
                  duration={item.dt}
                  clickItem={() => clickItem(item)}
                  songId={item.id}
                  nextMusic={() => changeSong(1)}
                  playMusic={playMusic}
                />
              )
            })}
        </div>
        <div className="main-line"></div>
        <LyricContent />
      </div>
    </div>
  )
}
export default memo(PlayPanel)
