import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Slider } from 'antd'
// import { formatMinuteSecond } from '@/utils/format'
import './index.less'
const PlayBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  setIsPlaying
  const playStyle = isPlaying ? '-165px' : '-204px'
  return (
    <div className="sprite_playBar PlayerBarWrapper">
      <div className="content wrap-v2">
        <div className="Control">
          <button className="sprite_playBar btn prev"></button>
          <button className="sprite_playBar btn play" style={{ backgroundPosition: `0 ${playStyle}` }}></button>
          <button className="sprite_playBar btn next"></button>
        </div>
        <div className="PlayInfo">
          <div className="image">
            <NavLink to="/discover/player">
              <img src="https://p2.music.126.net/OVkXDNmbk2uj6wE1KTZIwQ==/109951165203334337.jpg?param=34y34" alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">飞机场的十点半</span>
              <span className="singer-name">陶喆</span>
            </div>
            <div className="progress">
              <Slider />
              <div className="time">
                <span className="now-time">0：01</span>
                <span className="divider">/</span>
                <span className="total-time">4：40</span>
              </div>
            </div>
          </div>
        </div>
        <div className="Operator">
          <div className="left">
            <button className="sprite_playBar btn favor"></button>
            <button className="sprite_playBar btn share"></button>
          </div>
          <div className="right sprite_playBar">
            <button className="sprite_playBar btn volume"></button>
            <button className="sprite_playBar btn loop"></button>
            <button className="sprite_playBar btn playlist"></button>
          </div>
        </div>
      </div>
      <audio />
    </div>
  )
}
export default memo(PlayBar)
