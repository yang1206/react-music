import React, { useEffect, useCallback, useState, memo } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectRecommend, getBanner } from '@/store/reducer/recommend'
import './index.less'
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  //从store取出banners
  //TODO把数据请求从redux拿出来，使用Hook写
  const topBanner = useAppSelector(selectRecommend)
  const dispatch = useAppDispatch()
  useEffect(() => {
    //请求数据
    dispatch(getBanner())
  }, [dispatch])
  //走马灯轮播之前回调
  const bannerChange = useCallback((from: React.SetStateAction<number>, to: any) => {
    setTimeout(() => {
      //这里有bug，走马灯到最后一个不会触发回调事件
      if (from == to) setCurrentIndex(0)
      from > to ? setCurrentIndex(from) : setCurrentIndex(to)
    }, 0)
  }, [])
  //定义背景高斯模糊图
  const bgImage = topBanner.Banners[currentIndex] && topBanner.Banners[currentIndex].imageUrl + '?imageView&blur=40x20'
  return (
    <div className="BannerWrapper" style={{ background: 'url(' + bgImage + ') center center/ 6000px' }}>
      <div className="banner wrap-v2">
        <div className="BannerContent">
          <Carousel
            arrows={true}
            prevArrow={<LeftOutlined />}
            nextArrow={<RightOutlined />}
            autoplay
            effect="fade"
            beforeChange={bannerChange}
          >
            {topBanner.Banners.map(item => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                </div>
              )
            })}
          </Carousel>
        </div>
      </div>
    </div>
  )
}
export default memo(Banner)
