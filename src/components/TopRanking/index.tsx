import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { getSizeImage } from '@/utils/format'
import type { Recommend } from '@/store/interface/recommend'
import {
  getSong /* changeCurrentSong, changePlayList, changeCurrentIndex */,
  selectPlayList,
} from '@/store/slice/Player'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { useAddPlaylist } from '@/hooks/useAddPlaylist'
import './index.less'
interface Props {
  info: Recommend.topItem
}
const TopRanking: React.FC<Props> = (props) => {
  const { info } = props
  const dispatch = useAppDispatch()
  const playList = useAppSelector(selectPlayList).data
  const playMusic = (item: { id: number }) => {
    dispatch(getSong({ id: item.id, isPlay: true }))
  }
  const addPlaylist = useAddPlaylist(playList)
  return (
    <div className="TopRankingWrapper">
      <div className="header">
        <div className="image">
          <img src={getSizeImage(info?.coverImgUrl)} alt="" />
          <Link to={`/discover/ranking?id=${info?.id}`} className="image_cover">
            ranking
          </Link>
        </div>
        <div className="info">
          <Link to={`/discover/ranking?id=${info?.id}`}>{info?.name}</Link>
          <div>
            <button className="btn play sprite_02"></button>
            <button className="btn favor sprite_02"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {info.tracks?.slice(0, 10).map((item: any, index: number) => {
          return (
            <div key={item.id} className="list-item">
              <div className="rank">{index + 1}</div>
              <div className="info">
                <a className="name text-nowrap" onClick={() => playMusic(item)}>
                  {item.name}
                </a>
                <div className="operate">
                  <button className="btn sprite_02 play" onClick={() => playMusic(item)}></button>
                  <button
                    className="btn sprite_icon2 addto"
                    onClick={e => addPlaylist(e, item.id)}
                  ></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <Link to={`/discover/ranking?id=${info?.id}`}>查看全部 &gt;</Link>
      </div>
    </div>
  )
}

export default memo(TopRanking)
