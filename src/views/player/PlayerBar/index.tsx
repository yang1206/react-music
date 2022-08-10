import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { Slider } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectSong, getSong } from '@/store/slice/Player'
import { getSizeImage, formatMinuteSecond, getPlayUrl } from '@/utils/format'
import './index.less'
const PlayBar: React.FC = () => {
  //请求歌曲详细信息
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getSong(150404))
  }, [])
  //从redux取出数据
  const currentSong = useAppSelector(selectSong).data[0]
  //是否正在播放
  const [isPlaying, setIsPlaying] = useState(false)
  //获取播放标签实例
  const audioRef = useRef<HTMLAudioElement | null>(null)
  //是否在改变进度条
  const [isChanging, setIsChanging] = useState(false)
  //进度条展示数据
  const [progress, setProgress] = useState(0)
  //拖动进度条事件
  const sliderChange = useCallback((value: any) => {
    //改变状态，让进度条拖动时timeUpdate不在赋值
    setIsChanging(true)
    setProgress(value)
  }, [])
  const sliderAfterChange = useCallback((value: any) => {
    const currentsTime = ((value / 100) * currentSong?.dt) / 1000
    audioRef.current!.currentTime = currentsTime
    setIsChanging(false)
  }, [])
  //播放时间计时
  const [currentTime, setCurrentTime] = useState(0)
  const timeUpdate = (e: any) => {
    setCurrentTime(e.target.currentTime * 1000)
    if (!isChanging) setProgress((currentTime / currentSong?.dt) * 100)
  }
  setIsPlaying
  //根据是否播放展示不同按钮
  const playStyle = isPlaying ? '-165px' : '-204px'
  //点击播放按钮方法
  const playMusic = () => {
    //类型断言 not null
    audioRef.current!.src = getPlayUrl(currentSong.id)
    audioRef.current!.play()
  }
  let intViewportWidth = window.innerWidth
  console.log(intViewportWidth)
  return (
    <div className="PlayerBarWrapper">
      <div className="content wrap-v2">
        <div className="Control">
          <button className="sprite_playBar btn prev"></button>
          <button
            className="sprite_playBar btn play"
            onClick={() => playMusic()}
            style={{ backgroundPosition: `0 ${playStyle}` }}
          ></button>
          <button className="sprite_playBar btn next"></button>
        </div>
        <div className="PlayInfo">
          <div className="image">
            <NavLink to="/discover/player">
              <img src={getSizeImage(currentSong?.al.picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">{currentSong?.ar[0].name}</span>
            </div>
            <div className="progress">
              <Slider value={progress} onChange={sliderChange} onAfterChange={sliderAfterChange} />
              <div className="time">
                <span className="now-time">{formatMinuteSecond(currentTime)}</span>
                <span className="divider">/</span>
                <span className="total-time">{formatMinuteSecond(currentSong?.dt)}</span>
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
      <audio ref={audioRef} onTimeUpdate={timeUpdate} />
    </div>
  )
}
export default memo(PlayBar)
