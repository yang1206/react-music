import React, { memo } from 'react'
import './index.less'
const Player: React.FC = () => {
  return (
    <div className="PlayerWrapper">
      <div className="content wrap-v2">
        <div className="PlayerLeft"></div>
        <div className="PlayerRight"></div>
      </div>
    </div>
  )
}
export default memo(Player)
