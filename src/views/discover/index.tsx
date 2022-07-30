import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { discoverMenu } from '@/common/localData'
import { getBannerList } from '@/api'
import './index.less'
const Discover: React.FC = () => {
  //获取轮播图
  const getBannerData = async () => {
    const { data } = await getBannerList()
    console.log(data.banners)
  }
  useEffect(() => {
    getBannerData()
  }, [])
  return (
    <div className="DiscoverWrapper">
      <div className="top">
        <div className="TopMenu wrap-v1">
          {discoverMenu.map(item => {
            return (
              <div className="item" key={item.title}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </div>
            )
          })}
        </div>
      </div>
      <Outlet />
    </div>
  )
}
export default Discover
