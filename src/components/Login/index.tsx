import React, { useState, memo } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { changeIsVisible, selectIsVisible } from '@/store/slice/Login'
import { Button, message, Modal } from 'antd'
import { PhoneOutlined } from '@ant-design/icons'
import LoginIcon from './components/LoginIcon'
import LoginForm from './components/LoginForm'
import './index.less'
const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const isVisible = useAppSelector(selectIsVisible).data
  const [disabled, setDisabled] = useState(true)
  const [loginState, setLoginState] = useState('default') // 默认状态显示
  const defaultWrapperContent = (
    <div className="LoginWrapper">
      <div className="LoginLeft">
        <div className="login-content">
          <div className="login-bg"></div>
          <Button type="ghost" onClick={() => handleLogin('register')} shape="round" icon={<PhoneOutlined />} className="gap">
            注册
          </Button>
          <Button type="primary" shape="round" icon={<PhoneOutlined />} onClick={() => handleLogin('phone')}>
            手机号登录
          </Button>
        </div>
      </div>
      <div className="LoginRight">
        <div className="icons-wrapper">
          <LoginIcon onClick={() => message.warn('暂不做')} position="-150px -670px" description="微信登录" />
          <LoginIcon onClick={() => message.warn('暂不做')} position="-190px -670px" description="QQ登录" />
          <LoginIcon onClick={() => message.warn('暂不做')} position="-231px -670px" description="微博登录" />
          <LoginIcon onClick={() => handleLogin('email')} position="-271px -670px" description="网易邮箱登录" />
        </div>
      </div>
    </div>
  )
  // 取消
  const handleCancel = () => {
    // 关闭模态框
    dispatch(changeIsVisible(false))
    // 延迟返回初始化状态
    setTimeout(() => {
      setLoginState('default')
    }, 100)
  }

  const handleLogin = (loginMode: string) => {
    switch (loginMode) {
      case 'phone':
        setLoginState('phone')
        break
      case 'email':
        setLoginState('email')
        break
      case 'register':
        setLoginState('register')
        break
      default:
    }
  }
  const phoneLogin = (loginState: string) => {
    return (
      <div className="PhoneLoginModal">
        <LoginForm loginState={loginState} />
      </div>
    )
  }

  return (
    <Modal
      centered
      footer={null}
      title={
        <div
          style={{
            width: '100%',
            cursor: 'move'
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false)
            }
          }}
          onMouseOut={() => {
            setDisabled(true)
          }}
          // fix eslintjsx-a11y/mouse-events-have-key-events
          // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
          onFocus={() => {}}
          onBlur={() => {}}
          // end
        >
          {loginState === 'register' ? '注册' : '登录'}
        </div>
      }
      visible={isVisible}
      onCancel={handleCancel}
    >
      {/* 登录 */}
      {loginState === 'default' ? defaultWrapperContent : null}
      {loginState === 'phone' ? phoneLogin('phone') : undefined}
      {loginState === 'email' ? phoneLogin('email') : undefined}
      {loginState === 'register' ? phoneLogin('register') : undefined}
    </Modal>
  )
}
export default memo(Login)
