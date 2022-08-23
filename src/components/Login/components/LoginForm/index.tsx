import React, { useState, memo } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { getParseLoginState, getMatchReg } from '@/utils/format'
import { useAppDispatch } from '@/hooks/useStore'
import { getLoginProfileInfo } from '@/store/slice/Login'
import { sendRegisterCode, sendRegister } from '@/api/login'
import loginFormStyle from './index.module.less'
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { span: 30 }
}

const LoginForm: React.FC<{ loginState: string }> = (props: { loginState: string }) => {
  const dispatch = useAppDispatch()
  // 拿到"登录的方式"
  const { loginState } = props
  const [phone, setPhone] = useState(null)
  const [isSendState, setIsSendState] = useState(false)
  const [second, setSecond] = useState(60)
  // 解析登录状态: phone->'手机号'  email->'邮箱'  register -> 注册
  const parseLoginModeText = getParseLoginState(loginState)
  // 表单正则: 根据不同登录方式,匹配不同的正则
  const mathchReg = getMatchReg(loginState)
  const mathchPhoneReg = getMatchReg('phone')
  const pwdReg = /[0-9a-zA-Z._-]{6,20}/
  const codeReg = /[0-9a-zA-Z._-]{4,20}/

  const onFinish = ({ username, password }) => {
    // 先固定写死: 手机号登陆
    dispatch(getLoginProfileInfo({ username: username, password: password, tip: true }))
  }

  // 注册
  const onRegisterFinish = value => {
    // const { phone, password, code, nickname } = value
    sendRegister(value).then(res => {
      console.log(res)
      if (res.code === 200) message.success('注册成功')
      else message.warn(res.message)
    })
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const handleSendCode = () => {
    // 60秒延迟定时器
    if (!isSendState) {
      let i = 0
      const timer = setInterval(() => {
        i++
        setSecond(second - i)
        if (i >= 60) {
          clearInterval(timer)
          setIsSendState(false)
          setSecond(60)
        }
      }, 1000)
      // 发送验证码
      !isSendState &&
        sendRegisterCode(phone).then(res => {
          if (res.code === 200) message.success('发送成功')
          else message.warn('发送失败, 请60秒后发送验证码')
        })
    }
    setIsSendState(true)
  }
  return (
    <>
      <Form
        id="login"
        style={{
          display: loginState !== 'register' ? 'block' : 'none'
        }}
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          id="username"
          label={parseLoginModeText}
          name="username"
          rules={[
            {
              pattern: mathchReg,
              message: `请输入正确的${parseLoginModeText}`
            },
            { required: true, message: '请输入你的账户' }
          ]}
        >
          <Input autoFocus autoComplete="true" />
        </Form.Item>

        <Form.Item
          id="password"
          label="密码"
          name="password"
          rules={[
            { pattern: pwdReg, message: '密码最短6位' },
            { required: true, message: '请输入你的密码!' }
          ]}
        >
          <Input.Password autoComplete="true" />
        </Form.Item>
        <div className={loginFormStyle.textAlignRight}>
          <Checkbox className={loginFormStyle.mr80} defaultChecked={true}>
            自动登录
          </Checkbox>
          <span className={loginFormStyle.forgetPwd}>忘记密码?</span>
        </div>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" size="middle" block shape="round">
            登录
          </Button>
        </Form.Item>
      </Form>
      <Form
        id="register"
        style={{
          display: loginState === 'register' ? 'block' : 'none'
        }}
        {...layout}
        name="basic"
        onFinish={onRegisterFinish}
      >
        <Form.Item
          id="phone"
          label={parseLoginModeText}
          name="phone"
          rules={[
            {
              pattern: mathchPhoneReg,
              message: `请输入正确的手机号`
            },
            { required: true, message: '请输入你的手机号' }
          ]}
        >
          <Input
            autoFocus
            value={phone}
            onChange={({ target }) => {
              setPhone(target.value)
            }}
          />
        </Form.Item>

        <Form.Item
          id="password"
          label="密码"
          name="register_password"
          rules={[{ pattern: pwdReg, message: '密码最短6位', required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <div className={loginFormStyle.register} onClick={() => handleSendCode()}>
            {isSendState ? second + 's' : '发送验证码'}
          </div>
        </Form.Item>
        <Form.Item
          id="code"
          className={loginFormStyle.gap}
          label="验证码"
          name="code"
          rules={[
            { pattern: codeReg, message: '验证码最短4位' },
            { required: true, message: '请输入你的验证码' }
          ]}
        >
          <Input disabled={!isSendState} />
        </Form.Item>
        <Form.Item
          id="nickname"
          className={loginFormStyle.gap}
          label="昵称"
          name="nickname"
          rules={[{ required: true, message: '请输入你的昵称' }]}
        >
          <Input disabled={!isSendState} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" size="middle" block shape="round">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
export default memo(LoginForm)
