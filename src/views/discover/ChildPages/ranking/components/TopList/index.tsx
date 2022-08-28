import React, { Fragment, memo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/hooks/useStore'
import { selectCurrentIndex, changeCurrentIndex, changeCurrentTopListId } from '@/store/slice/TopList'
import { getSizeImage } from '@/utils/format'
import './index.less'
interface Props {
  topListInfo: {
    [key: string]: any
  }
}
const TopListInfo: React.FC<Props> = props => {
  const { topListInfo } = props
  const currentIndex = useAppSelector(selectCurrentIndex).data
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // other function
  const clickItem = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number, id: any) => {
    e.preventDefault()
    // dispatch
    dispatch(changeCurrentTopListId(id))
    dispatch(changeCurrentIndex(index))
    // 修改URL
    navigate(`/discover/ranking?id=${id}`, {
      replace: false
    })
  }
  return (
    <div className="TopListItemWrapper">
      {topListInfo.map((item: any, index: number) => {
        return (
          <Fragment key={item.id}>
            <h3 style={{ marginTop: index === 4 ? '17px' : '' }}>
              {index === 0 ? '云音乐特色榜' : index === 4 ? '全球媒体榜' : ''}
            </h3>
            <NavLink
              className={'info ' + (index === currentIndex ? 'bg' : '')}
              onClick={e => clickItem(e, index, item.id)}
              to={{ pathname: `/discover/songs`, search: `?id=${item.id}` }}
            >
              <div className="image">
                <img src={getSizeImage(item.coverImgUrl, 44)} alt="" />
              </div>
              <div className="info-right">
                <div className="info-title">{item.name}</div>
                <div className="info-update">{item.updateFrequency}</div>
              </div>
            </NavLink>
          </Fragment>
        )
      })}
    </div>
  )
}
export default memo(TopListInfo)
