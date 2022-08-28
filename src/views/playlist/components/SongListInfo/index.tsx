import { useCallback, memo } from 'react'
import { Skeleton, Tag } from 'antd'
import { useAppSelector, useAppDispatch } from '@/hooks/useStore'
import { getSizeImage, parseTime } from '@/utils/format'
import { selectSongListDetailInfo } from '@/store/slice/SongList'
import { selectLoginState, selectProfile, changeIsVisible } from '@/store/slice/Login'
import { subscribeSongList, deleteSongList } from '@/api/user'
import { message } from 'antd'
import { HeartTwoTone, DeleteOutlined } from '@ant-design/icons'
import RcmHeader from '@/components/RcmHeader'
import PlayList from '@/components/PlayList'
import './index.less'
const SongListInfo: React.FC = () => {
  const dispatch = useAppDispatch()
  const SongListDetail = useAppSelector(selectSongListDetailInfo).data.playList
  const isLogin = useAppSelector(selectLoginState).data
  const userID = useAppSelector(selectProfile).data.userId
  const SongListUser = SongListDetail.userId
  const coverPicUrl = SongListDetail && SongListDetail.coverImgUrl
  const headerTitle = SongListDetail && SongListDetail.name
  const avatarPic =
    SongListDetail &&
    SongListDetail.creator &&
    SongListDetail.creator.avatarUrl &&
    getSizeImage(SongListDetail.creator.avatarUrl, 35)
  const avatarName = SongListDetail && SongListDetail.creator && SongListDetail.creator.nickname
  const avatarDatetime = SongListDetail && SongListDetail.createTime && parseTime(SongListDetail.createTime, '{y}-{m}-{d}')
  const labelsArr = SongListDetail && SongListDetail.tags
  const description = SongListDetail && SongListDetail.description
  const playCount = SongListDetail && SongListDetail.playCount
  const playlist = SongListDetail && SongListDetail.tracks
  const subscribed = SongListDetail.subscribed

  // 收藏/取消收藏歌单
  const collectSongList = useCallback(() => {
    if (isLogin) {
      // 收藏歌单接口
      if (!subscribed) {
        subscribeSongList({ id: SongListDetail.id, t: 0 }).then(res => {
          if (res.code === 200) message.success('收藏成功')
        })
      } else {
        subscribeSongList({ id: SongListDetail.id, t: 1 }).then(res => {
          if (res.code === 200) message.success('取消收藏成功')
        })
      }
    } else {
      dispatch(changeIsVisible(true))
    }
  }, [isLogin, dispatch, playlist])
  //删除歌单
  const deleteList = useCallback(() => {
    if (isLogin) {
      deleteSongList({ id: SongListDetail.id }).then(res => {
        if (res.code === 200) message.success('删除成功')
      })
    } else {
      dispatch(changeIsVisible(true))
    }
  }, [isLogin, dispatch, userID, SongListUser])
  const renderTags = () => {
    return (
      labelsArr &&
      labelsArr.map(value => {
        return (
          <Tag color="#de021d" key={value}>
            {value}
          </Tag>
        )
      })
    )
  }

  const renderRightSlot = (
    <span>
      播放：<em style={{ color: '#c20c0c' }}>{playCount}</em>次
    </span>
  )
  return (
    <div className="SongListDetailWrapper">
      {!SongListDetail && <Skeleton active />}
      {/* 歌单详情头部 */}
      <div className="HeaderTitle flex">
        <div className="conver-img">
          <img src={getSizeImage(coverPicUrl, 200)} alt="" />
          <span className="image_cover"></span>
        </div>
        <div className="song-detail">
          <div className="detail-title-wrapper">
            <i className="icons"></i>
            <h2 className="detail-title">{headerTitle}</h2>
          </div>
          <div className="avatar">
            <div className="avatar-pic">
              <img src={avatarPic} alt="" />
            </div>
            <div className="avatar-name">{avatarName}</div>
            <div className="avatar-datetime">{avatarDatetime}创建</div>
          </div>
          <div className="label-warpper flex gap">
            {labelsArr.length > 0 && <span>标签: </span>}
            {renderTags()}
            <div className="sprite_button favorite pointer" style={{ marginBottom: '5px' }}>
              {!subscribed && <HeartTwoTone onClick={() => collectSongList()} style={{ fontSize: '30px' }} />}
              {subscribed && <HeartTwoTone onClick={() => collectSongList()} twoToneColor="red" style={{ fontSize: '30px' }} />}
            </div>
            {/* 歌单创建者和当前用户是否相同 */}
            {userID === SongListUser && (
              <div
                className="sprite_button favorite pointer"
                style={{ marginBottom: '5px', marginLeft: '10px' }} /*onClick={() => collectSonglist()}*/
              >
                <DeleteOutlined onClick={() => deleteList()} style={{ fontSize: '30px' }} />
              </div>
            )}
          </div>
          <div className="description-info gap">
            <details className="description-details">
              <summary>介绍:{description.slice(0, 98)}</summary>
              {description.slice(98)}
            </details>
          </div>
        </div>
      </div>
      {/* 歌单详情音乐列表 */}
      <div className="MainDetail">
        <RcmHeader title="歌曲列表" right={renderRightSlot} />
        {playlist && <PlayList playlist={playlist} />}
      </div>
    </div>
  )
}
export default memo(SongListInfo)
