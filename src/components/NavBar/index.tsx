import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { discoverMenu } from '@/common/localData'
import './index.less'
const NavBar: React.FC = () => {
  return (
    <div className="NavBarWrapper wrap-v1">
      <div className="">
        <div className="TopMenu wrap-v2">
          {discoverMenu.map(item => {
            return (
              <div className="item" key={item.title}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default memo(NavBar)
