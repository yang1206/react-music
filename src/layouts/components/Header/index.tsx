import { NavLink } from 'react-router-dom'
// import { Input } from 'antd'
// import { SearchOutlined } from '@ant-design/icons'
import Search from './components/Search'
import Avatar from './components/Avatar'
import { headerLinks } from '@/common/localData'
import './index.less'
export default function Header() {
  const showSelectItem = (item: any, index: number): JSX.Element => {
    if (index < 3) {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="sprite_01 icon"></i>
        </NavLink>
      )
    }
    else {
      return <a href={item.link}>{item.title}</a>
    }
  }
  return (
    <div className="HeaderWrapper">
      <div className="content">
        <div className="HeaderLeft">
          <div className="logo sprite_01"></div>
          <div className="select-list">
            {headerLinks.map((item, index) => {
              return (
                <div className="select-item" key={item.title}>
                  {showSelectItem(item, index)}
                </div>
              )
            })}
          </div>
        </div>
        <div className="HeaderRight">
          <Search />
          <div className="center">创作者中心</div>
          <Avatar />
        </div>
      </div>
      <div className="divider"></div>
    </div>
  )
}
