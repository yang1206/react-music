import React, { memo } from 'react'
const User: React.FC = () => {
  return (
    <div>
      <div className="mineWrapper w980">
        <div className="show-no-login">
          <div className="my_music inner">
            <h2>登录网易云音乐</h2>
            <div className="my_music btn-login">立即登录</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(User)
