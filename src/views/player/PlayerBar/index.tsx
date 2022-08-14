import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { Slider, message, Tooltip } from 'antd'
import { CSSTransition } from 'react-transition-group'
import PlayPanel from '@/views/player/PlayPanel'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import {
  selectSong,
  selectLyric,
  selectSequence,
  selectPlayList,
  selectCurrentLyricIndex,
  getSong,
  changePlaySong,
  changeSequence,
  changeCurrentLyricIndex
} from '@/store/slice/Player'
import { getSizeImage, formatMinuteSecond, getPlayUrl } from '@/utils/format'
import './index.less'
const PlayBar: React.FC = () => {
  //从redux取出数据
  const currentSong = useAppSelector(selectSong).data
  const currentLyric = useAppSelector(selectLyric).data
  const playList = useAppSelector(selectPlayList).data
  const currentLyricIndex = useAppSelector(selectCurrentLyricIndex).data
  const sequence = useAppSelector(selectSequence).data
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
  //播放顺序按钮的展示
  const [loopClass, setLoopClass] = useState('sprite_playBar btn loop')
  //播放暂停按钮的展示
  const [playClass, setPlayClass] = useState('sprite_playBar btn play')
  //获取播放标签实例
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // 是否显示播放列表
  const [showPanel, setShowPanel] = useState(false)
  // 是否显示音量播放条
  const [isShowBar, setIsShowBar] = useState(false)
  useEffect(() => {
    dispatch(getSong(150412))
  }, [dispatch])
  useEffect(() => {
    setDuration(currentSong?.dt)
    //在hooks里设置歌曲src
    audioRef.current!.src = getPlayUrl(currentSong?.id)
    audioRef
      .current!.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        setIsPlaying(false)
      })
    currentSong?.dt ? setDuration(currentSong.dt) : setDuration(currentSong?.dt)
  }, [currentSong])
  //点击播放按钮方法
  const play = useCallback(() => {
    //类型断言 not null
    isPlaying ? audioRef.current!.pause() : audioRef.current!.play()
    //先判断在改变播放状态
    setIsPlaying(!isPlaying)
    isPlaying ? setPlayClass('sprite_playBar btn play') : setPlayClass('sprite_playBar btn pause')
  }, [isPlaying])
  //歌曲播放完毕
  const playEnded = useCallback(() => {
    if (sequence === 2) {
      //单曲循环
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      dispatch(changePlaySong(1))
      //如果播放列表为空，继续播放当前这首歌
      if (playList.length === 0) {
        audioRef.current.play()
      }
      setIsPlaying(true)
    }
  }, [])
  const timeUpdate = (e: any) => {
    const currentTime = e.target.currentTime * 1000
    //如果进度条正在被拖动Progress，也就是当前进度条的位置就不随着歌曲进度改变
    if (!isChanging) {
      setProgress((currentTime / duration) * 100)
      setCurrentTime(currentTime)
    }

    //获取当前的歌词
    let i = 0
    for (; i < currentLyric.length; i++) {
      let lyricItem = currentLyric[i]
      if (currentTime < lyricItem.time) {
        break
      }
    }
    if (!(currentLyricIndex === i - 1)) {
      dispatch(changeCurrentLyricIndex(i - 1))
      const content = currentLyric[i - 1] && currentLyric[i - 1].content
      if (isPlaying) {
        message.open({
          key: 'lyric',
          content: content,
          duration: 0
        })
      }
      // 如果显示播放列表那么不展示歌词
      showPanel && message.destroy('lyric')
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
  const changeSequenceData = () => {
    let currentSequence = sequence + 1
    if (currentSequence > 2) {
      currentSequence = 0
    }
    switch (currentSequence) {
      case 1:
        setLoopClass('sprite_playBar btn shuffle')
        break
      case 2:
        setLoopClass('sprite_playBar btn one')
        break
      default:
        setLoopClass('sprite_playBar btn loop')
        break
    }
    dispatch(changeSequence(currentSequence))
  }
  //上一首下一首
  const changeMusic = (tag: number) => {
    dispatch(changePlaySong(tag))
  }
  //播放列表是否显示
  const changeShowPanel = useCallback(() => {
    setShowPanel(!showPanel)
  }, [showPanel])
  // 更改音量
  const changingVolume = (value: number) => {
    audioRef.current.volume = value / 100
  }

  return (
    <div className="PlayerBarWrapper">
      <div className="content wrap-v2">
        <div className="Control">
          <button
            className="sprite_playBar btn prev"
            onClick={() => {
              changeMusic(-1)
            }}
          ></button>
          <button className={playClass} onClick={() => play()} style={{ backgroundPosition: `0 ${playStyle}` }}></button>
          <button
            className="sprite_playBar btn next"
            onClick={() => {
              changeMusic(1)
            }}
          ></button>
        </div>
        <div className="PlayInfo">
          <div className="image">
            <NavLink to="/discover/song">{currentSong && <img src={getSizeImage(currentSong?.al.picUrl, 35)} alt="" />}</NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              {currentSong?.ar[0] && <span className="singer-name">{currentSong?.ar[0].name}</span>}
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
            <Tooltip title="调节音量">
              <button className="sprite_playBar btn volume" onClick={() => setIsShowBar(!isShowBar)}></button>
            </Tooltip>
            <button
              className={loopClass}
              onClick={() => {
                changeSequenceData()
              }}
            ></button>
            <Tooltip title="播放列表">
              <button
                className="sprite_playBar btn playlist"
                onClick={() => {
                  setShowPanel(!showPanel)
                }}
              >
                <span>{playList.length}</span>
              </button>
            </Tooltip>
            <CSSTransition in={showPanel} timeout={3000} classNames="playlist">
              <PlayPanel
                showPanel={showPanel}
                playlistCount={playList.length}
                closeWindow={changeShowPanel}
                playMusic={play}
                changeSong={changePlaySong}
                isPlaying={isPlaying}
              />
            </CSSTransition>
          </div>
          {/*音量调节条 */}
          <div className="sprite_player top-volume" style={{ display: isShowBar ? 'block' : 'none' }}>
            <Slider vertical defaultValue={30} onChange={changingVolume} />
          </div>
        </div>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={playEnded} />
    </div>
  )
}
export default memo(PlayBar)
