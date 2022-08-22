import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { PlayCircleOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { useAddPlaylist } from '@/hooks/useAddPlaylist'
import { selectPlayList } from '@/store/slice/Player'
import { getSong } from '@/store/slice/Player'
import { message } from 'antd'
import './index.less'
interface Props {
  songId: number
  songName: string
  singer: string
  album: string
  duration: string
}

const SingleSong: React.FC<Props> = ({ songId, songName, singer, album, duration }: Props) => {
  const dispatch = useAppDispatch()
  const playList = useAppSelector(selectPlayList).data
  // 播放音乐
  const playMusic = () => {
    dispatch(getSong({ id: songId, isPlay: true }))
  }

  const addPlaylist = useAddPlaylist(playList, message)
  return (
    <div className="SingleSongItemWrapper">
      <div className="song-name">
        <PlayCircleOutlined onClick={() => playMusic()} />
        <em onClick={() => playMusic()}>{songName}</em>
        <button className="sprite_icon2 btn addto" onClick={e => addPlaylist(e, songId)}></button>
      </div>
      <NavLink to="/discover/song" className="singer" onClick={() => playMusic()}>
        {singer}
      </NavLink>
      <div className="text-nowrap album">《{album}》</div>
      <div className="text-nowrap duration">{duration}</div>
    </div>
  )
}
export default memo(SingleSong)
