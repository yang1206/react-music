import React, { memo } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { discoverMenu } from '@/common/localData'
import './index.less'
const Discover: React.FC = () => {
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
export default memo(Discover)
