import { NavLink } from 'react-router-dom'
import { headerLinks } from '@/common/localData'

import './index.scss'
export default function Header() {
  const showSelectItem = (item: any, index: number): JSX.Element => {
    if (index < 3) {
      return (
        <NavLink to={item.link}>{item.title}</NavLink>
      )
    } else {
      return <a href={item.link}>{item.title}</a>
    }
  }


  return (
    <div className='HeaderWrapper'>
      <div className="content">
        <div className="HeaderLeft">
          <div className='logo sprite_01'>
          </div>
          <div className='select-list'>
            {
              headerLinks.map((item, index) => {
                return (
                  <div className='select-item' key={item.title}>
                    <i className='sprite_01 icon'></i>
                    {showSelectItem(item,index)}
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="HeaderRight">

        </div>
      </div>
      <div className="divider">

      </div>
      {/* <NavLink to="/discover">发现音乐</NavLink>
      <NavLink to="/mine">我的音乐</NavLink>
      <NavLink to="/friend">我的好友</NavLink> */}
    </div>
  )
}
