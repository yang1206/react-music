import React, { useEffect, memo } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectNewAlbums, getNewAlbums } from '@/store/slice/recommend'
import { Skeleton } from 'antd'
import AlbumCover from '@/components/AlbumCover'
import RcmHeader from '@/components/RcmHeader'
import './index.less'
const HotAlbum: React.FC = () => {
  const dispatch = useAppDispatch()
  const hotNewAlbums = useAppSelector(selectNewAlbums).data.slice(0, 10)
  useEffect(() => {
    dispatch(getNewAlbums())
  }, [])
  const CoverProps = {
    width: '150px',
    size: '130px',
    bgp: '-845px'
  }
  return (
    <div className="HotAlbumWrapper">
      <RcmHeader title={'热门新碟'} right={<></>} />
      {!hotNewAlbums.length ? (
        <Skeleton active />
      ) : (
        <div className="HotAlbum-list">
          {hotNewAlbums.map((item, index: number) => {
            return (
              <div key={index} className="HotAlbum-item">
                <AlbumCover info={item} {...CoverProps} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default memo(HotAlbum)
