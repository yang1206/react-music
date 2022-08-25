import React, { useCallback, useEffect, useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectProfile, selectLoginState, changeIsVisible } from '@/store/slice/Login'
import { gotoUserSongList, CreateSongList } from '@/api/user'
import { getCity, getSizeImage } from '@/utils/format'
import Authentication from '@/components/Authentication'
import Modal from 'antd/lib/modal/Modal'
import { ManOutlined, PlayCircleOutlined, WomanOutlined } from '@ant-design/icons'
import { Input, message } from 'antd'
import RcmHeader from '@/components/RcmHeader'
import SongsCover from '@/components/SongsCover'
import './index.less'
const User: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [myPlaylist, setMyPlaylist] = useState([])
  const [subPlaylist, setSubPlaylist] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [playlistName, setPlaylistName] = useState(null)
  const isLogin = useAppSelector(selectLoginState).data
  const userinfo = useAppSelector(selectProfile).data

  const userPic = userinfo && userinfo.avatarUrl && getSizeImage(userinfo.avatarUrl, 180)
  const nickname = userinfo && userinfo.nickname
  const gender = userinfo && userinfo.gender === 1 ? 'man' : 'woman'
  const dynamic = [
    {
      name: '动态',
      value: userinfo && userinfo.authStatus
    },
    {
      name: '关注',
      value: userinfo && userinfo.follows
    },
    {
      name: '粉丝',
      value: userinfo && userinfo.followeds
    }
  ]
  const signature = userinfo && userinfo.signature
  const city = userinfo && userinfo.city && getCity(userinfo.city)
  const userId = userinfo && userinfo.userId
  // other hook
  useEffect(() => {
    gotoUserSongList({ uid: userId }).then(res => {
      let my = []
      let sub = []
      res.playlist.map((item: { subscribed: boolean }) => {
        if (item.subscribed) {
          sub.push(item)
        } else {
          my.push(item)
        }
      })
      setMyPlaylist(my)
      setSubPlaylist(sub)
    })
  }, [userId])
  // handle
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const toRedirect = useCallback(() => {
    navigate('/')
  }, [navigate])
  const showModalDom = () => {
    setIsModalVisible(true)
  }
  const showModal = useCallback(() => {
    dispatch(changeIsVisible(true))
  }, [dispatch])
  const handleOk = () => {
    CreateSongList({ name: playlistName }).then(() => {
      message.success('创建成功')
      setIsModalVisible(false)
    })
  }
  // template
  const renderDynamicList = () => {
    return dynamic.map(item => {
      return (
        <div className="dynamic-item" key={item.name}>
          <strong className="count">{item.value}</strong>
          <span>{item.name}</span>
        </div>
      )
    })
  }
  const renderCreatePlaylist = () => {
    return (
      <span className="creator" onClick={showModalDom}>
        创建歌单
      </span>
    )
  }
  return (
    <div className="ProfileWrapper">
      <Authentication flag={isLogin} to={toRedirect} showModal={showModal} />
      <div className="user-info flex">
        <div className="user-pic">
          <img src={userPic} alt="" />
        </div>
        <div className="user-detail">
          <div className="nickname-wrap">
            <h3 className="nickname gap">{nickname}</h3>
            <div className="gender-icon">
              {gender === 'man' ? (
                <ManOutlined className="gender-icon man" />
              ) : (
                <WomanOutlined className="gender-icon" color="#e60026" />
              )}
            </div>
          </div>
          <div className="dynamic-wrap flex">{renderDynamicList()}</div>
          <div className="recommend">个人介绍：{signature}</div>
          <div className="address">所在地区：{city}</div>
        </div>
      </div>
      <div className="song-list">
        <RcmHeader title={`我的歌单(${myPlaylist.length})`} right={renderCreatePlaylist()} />
        <div className="playlist flex">
          {myPlaylist &&
            myPlaylist.map &&
            myPlaylist.map(item => {
              return <SongsCover info={item} key={item.id} />
            })}
        </div>
      </div>
      <div className="song-list">
        <RcmHeader title={`我收藏的歌单(${subPlaylist.length})`} right={renderCreatePlaylist()} />
        <div className="playlist flex">
          {subPlaylist &&
            subPlaylist.map &&
            subPlaylist.map(item => {
              return <SongsCover info={item} key={item.id} />
            })}
        </div>
      </div>
      <Modal title="创建歌单" okText="确认" cancelText="取消" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input
          size="large"
          placeholder="请输入歌单"
          prefix={<PlayCircleOutlined />}
          value={playlistName}
          onChange={e => setPlaylistName(e.target.value)}
        />
      </Modal>
    </div>
  )
}
export default memo(User)
