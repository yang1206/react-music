import React, { useEffect, useRef, memo } from 'react'
import type { CarouselRef } from 'antd/lib/carousel'
import { Carousel } from 'antd'
import RcmHeader from '@/components/RcmHeader'
import AlbumCover from '@/components/AlbumCover'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectNewAlbums, getNewAlbums } from '@/store/slice/recommend'
import './index.less'
const NewAlbum: React.FC = () => {
  //传递给头部卡片
  const headerProps = {
    title: '新碟上架',
    keywords: [],
    keywordClick: () => {
      // navigate('/discover/songs')
    },
    moreLink: '/discover/album'
  }
  //传递给专辑卡片的数据
  const CoverProps = {
    width: '118px',
    size: '100px',
    bgp: '-570px'
  }
  //从store取出banners
  const newAlbums = useAppSelector(selectNewAlbums)
  console.log(newAlbums)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getNewAlbums())
  }, [])
  const pageRef = useRef<CarouselRef>(null)
  return (
    <div className="AlbumWrapper">
      <RcmHeader {...headerProps} />
      <div className="albumContent">
        <button onClick={() => pageRef.current?.prev()} className="arrow arrow-left sprite_02"></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {[0, 1].map(item => {
              return (
                <div key={item} className="page">
                  {newAlbums.data.slice(item * 5, (item + 1) * 5).map(info => {
                    return <AlbumCover key={info.id} info={info} {...CoverProps} />
                  })}
                </div>
              )
            })}
          </Carousel>
        </div>
        <button onClick={() => pageRef.current?.next()} className="arrow arrow-right sprite_02"></button>
      </div>
    </div>
  )
}
export default memo(NewAlbum)
