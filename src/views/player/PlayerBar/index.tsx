import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { Slider } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectSong, getSong } from '@/store/slice/Player'
import { getSizeImage, formatMinuteSecond, getPlayUrl } from '@/utils/format'
import './index.less'
const PlayBar: React.FC = () => {
  const currentSong = useAppSelector(selectSong).data[0]
  //请求歌曲详细信息
  const dispatch = useAppDispatch()
  //歌曲时长
  const [duration, setDuration] = useState(currentSong?.dt)
  //是否正在播放
  const [isPlaying, setIsPlaying] = useState(false)
  //是否在改变进度条
  const [isChanging, setIsChanging] = useState(false)
  //进度条展示数据
  const [progress, setProgress] = useState(0)
  //播放时间计时
  const [currentTime, setCurrentTime] = useState(0)
  //从redux取出数据

  //获取播放标签实例
  const audioRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    dispatch(getSong(150404))
  }, [])
  useEffect(() => {
    setDuration(currentSong?.dt)
    //在hooks里设置歌曲src
    audioRef.current!.src = getPlayUrl(currentSong?.id)
    // audioRef
    //   .current!.play()
    //   .then(() => {
    //     setIsPlaying(true)
    //   })
    //   .catch(() => {
    //     setIsPlaying(false)
    //   })
    currentSong?.dt ? setDuration(currentSong.dt) : setDuration(currentSong?.dt)
  }, [currentSong])
  //点击播放按钮方法
  const play = useCallback(() => {
    //类型断言 not null
    isPlaying ? audioRef.current!.pause() : audioRef.current!.play()
    //先判断在改变播放状态
    setIsPlaying(!isPlaying)
  }, [isPlaying])
  const timeUpdate = (e: any) => {
    //如果进度条正在被拖动Progress，也就是当前进度条的位置就不随着歌曲进度改变
    if (!isChanging) {
      setProgress((currentTime / duration) * 100)
      setCurrentTime(e.target.currentTime * 1000)
    }
  }
  //根据是否播放展示不同按钮
  const playStyle = isPlaying ? '-165px' : '-204px'
  //拖动进度条事件
  const sliderChange = useCallback(
    (value: any) => {
      //改变状态，让进度条拖动时进度条不在不赋值
      setIsChanging(true)
      const time = (value / 100.0) * duration
      //拖动的时候设置当前时间
      setCurrentTime(time)
      //改变进度条当前位置
      setProgress(value)
    },
    [duration]
  )
  const sliderAfterChange = useCallback(
    (value: any) => {
      const time = ((value / 100.0) * duration) / 1000
      audioRef.current!.currentTime = time
      setCurrentTime(time * 1000)
      //鼠标抬起，恢复进度条改变状态
      setIsChanging(false)

      if (isPlaying) audioRef.current?.play()
    },
    //这里必须依赖duration，否则会设置为0
    [duration, isPlaying, play]
  )
  // let intViewportWidth = window.innerWidth
  return (
    <div className="PlayerBarWrapper">
      <div className="content wrap-v2">
        <div className="Control">
          <button className="sprite_playBar btn prev"></button>
          <button
            className="sprite_playBar btn play"
            onClick={() => play()}
            style={{ backgroundPosition: `0 ${playStyle}` }}
          ></button>
          <button className="sprite_playBar btn next"></button>
        </div>
        <div className="PlayInfo">
          <div className="image">
            <NavLink to="/discover/song">
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
                <span className="total-time">{formatMinuteSecond(duration)}</span>
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
