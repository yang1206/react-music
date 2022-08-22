import React, { memo } from 'react'
type Params = {
  position: string
  description: string
  onClick: () => void
}
const LoginIcon: React.FC<Params> = (props: Params) => {
  const { position, description, onClick } = props
  return (
    <a style={{ display: 'flex', width: '149px', marginTop: '19px', lineHeight: '38px' }} onClick={onClick}>
      <i className="theme-logo" style={{ width: '38px', height: '38px', backgroundPosition: position }}></i>
      <em style={{ marginLeft: '14px' }}>{description}</em>
    </a>
  )
}
export default memo(LoginIcon)
