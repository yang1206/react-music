import React, { memo } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { changeCurrentCategory, getPlayList, selectCategory } from '@/store/slice/SongList'
import './index.less'
const SongsCategory: React.FC = () => {
  const category = useAppSelector(selectCategory).data
  const dispatch = useAppDispatch()
  function changeCategory(name: string) {
    dispatch(changeCurrentCategory(name))
    dispatch(getPlayList(0))
  }
  return (
    <div className="CategoryWrapper">
      <div className="arrow sprite_icon"></div>
      <div className="all">
        <span className="link" onClick={() => changeCategory('全部')}>
          全部风格
        </span>
      </div>
      <div className="category">
        {category.map((item, index) => {
          return (
            <dl key={item.name} className={`item${index}`}>
              <dt>
                <i className="icon sprite_icon2"></i>
                <span>{item.name}</span>
              </dt>
              <dd>
                {item.subs.map((sItem) => {
                  return (
                    <div className="item" key={sItem.name}>
                      <span className="link" onClick={() => changeCategory(sItem.name)}>
                        {sItem.name}
                      </span>
                      <span className="divider">|</span>
                    </div>
                  )
                })}
              </dd>
            </dl>
          )
        })}
      </div>
    </div>
  )
}
export default memo(SongsCategory)
