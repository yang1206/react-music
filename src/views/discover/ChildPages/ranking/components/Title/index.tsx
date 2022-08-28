import React, { memo } from 'react'
import { useAppSelector } from '@/hooks/useStore'
import { selectCurrentTopListTitleInfo } from '@/store/slice/TopList'
import { getSizeImage, formatMonthDay } from '@/utils/format'
import { FieldTimeOutlined } from '@ant-design/icons'
import './index.less'
const TopListTitle = () => {
  const titleInfo = useAppSelector(selectCurrentTopListTitleInfo).data
  const picUrl = titleInfo && titleInfo.coverImgUrl
  const name = titleInfo && titleInfo.name
  const updateTime = titleInfo && titleInfo.trackNumberUpdateTime
  const commentCount = titleInfo && titleInfo.commentCount
  const shareCount = titleInfo && titleInfo.shareCount
  const subscribedCount = titleInfo && titleInfo.subscribedCount
  return (
    <div className="TopListTitleWrapper">
      <div className="title-image">
        <img src={getSizeImage(picUrl, 150)} alt="" />
        <div className="image_cover msk"></div>
      </div>
      <div className="title-info">
        <h2>{name}</h2>
        <div className="update-info">
          <FieldTimeOutlined className="timer" />
          最近更新: {formatMonthDay(updateTime)}
        </div>
        <div className="controls">
          <div className="sprite_button play">
            <i className="sprite_button inner">
              <em className="sprite_button play-icon"></em>
              播放
            </i>
          </div>
          <div className="sprite_button favorite">
            <i className="sprite_button inner">
              <em className="sprite_button favorite-icon"></em>({subscribedCount})
            </i>
          </div>
          <div className="sprite_button share">
            <i className="sprite_button inner">
              <em className="sprite_button favorite-icon"></em>({shareCount})
            </i>
          </div>
          <div className="sprite_button download">
            <i className="sprite_button inner">
              <em className="sprite_button favorite-icon"></em>
              下载
            </i>
          </div>
          <div className="sprite_button comment">
            <i className="sprite_button inner">
              <em className="sprite_button favorite-icon"></em>({commentCount})
            </i>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(TopListTitle)
