import React, { memo, useEffect, useState } from 'react'
import { selectSong } from '@/store/slice/Player'
import { useAppSelector } from '@/hooks/useStore'
import { formatMinuteSecond } from '@/utils/format'
import { getSongSimi } from '@/api/song'
import SongInfo from './components/SongInfo'
import SongItem from './components/SongItem'
import './index.less'
const Player: React.FC = () => {
  const [simiList, setSimiList] = useState([])
  const currentSong = useAppSelector(selectSong).data
  useEffect(() => {
    getSongSimi({ id: currentSong.id }).then(res => {
      setSimiList(res.songs)
    })
  }, [currentSong])
  return (
    <div className="PlayerWrapper">
      <div className="content wrap-v2">
        <div className="PlayerLeft">
          <SongInfo />
        </div>
        <div className="PlayerRight">
          {simiList &&
            simiList.map(item => {
              return (
                <SongItem
                  key={item.id}
                  className="song_item"
                  // coverPic={index < 3?item.al.picUrl:''}
                  duration={formatMinuteSecond(item.dt)}
                  songName={item.name}
                  singer={item.artists[0].name}
                  songId={item.id}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
export default memo(Player)
