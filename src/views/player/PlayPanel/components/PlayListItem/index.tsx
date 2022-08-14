import React, { memo } from 'react'
import { DownloadOutlined, DeleteOutlined, GithubOutlined, LikeOutlined } from '@ant-design/icons'
import { formatDate, getPlayUrl } from '@/utils/format'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectPlayList, selectSong, changePlayList, changeCurrentSong } from '@/store/slice/Player'
import './index.less'
const PlayListItem: React.FC<any> = props => {
  const { songName, singer, duration, isActive, clickItem, songId, nextMusic, playMusic } = props
  const dispatch = useAppDispatch()
  const playList = useAppSelector(selectPlayList).data
  const currentSong = useAppSelector(selectSong).data
  // 清除当前播放音乐
  const clearCurrentSong = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    // 从当前播放列表删除此音乐,然后派发action
    e.stopPropagation()
    // 移除歌曲
    // removeSongId(songId)
    const currentSongIndex = playList.findIndex((song: { id: number }) => song.id === songId)
    if (playList.length === 1) return
    if (currentSong.id === songId) {
      playMusic()
      dispatch(changeCurrentSong(playList[currentSongIndex - 1]))
    }
    let newArr = [...playList]
    newArr.splice(currentSongIndex, 1)
    dispatch(changePlayList(newArr))
    // 切换下一首音乐
    nextMusic()
  }
  return (
    <div className={isActive + ' PlaylistItemWrapper'} onClick={clickItem}>
      <div className="song-name">{songName}</div>
      <div className="control-and-singer">
        <LikeOutlined />
        <GithubOutlined />
        <DownloadOutlined onClick={() => window.open(getPlayUrl(songId))} />
        <DeleteOutlined onClick={e => clearCurrentSong(e)} />
        <span>{singer}</span>
      </div>
      <div className="duration">{formatDate(duration, 'mm:ss')}</div>
    </div>
  )
}
export default memo(PlayListItem)
