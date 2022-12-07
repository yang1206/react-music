import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { singerCategories } from '@/common/localData'
import './index.less'
const ArtistCategory: React.FC = () => {
  return (
    <div className="ArtistCategoryWrapper">
      {singerCategories.map((item, index) => {
        return (
          <div key={index} className="category">
            <p className="label">{item.title}</p>
            <div className="info artist">
              {item.artists.map(
                (j: { name: string; url: string }, k: number) => {
                  return (
                    <NavLink to={j.url} className="categoryItem" key={k}>
                      {j.name}
                    </NavLink>
                  )
                },
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default memo(ArtistCategory)
