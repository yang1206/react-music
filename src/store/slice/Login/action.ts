import { createAsyncThunk } from '@reduxjs/toolkit'
import { changeIsVisible, changeProfileInfo, changeCookie, changeLoginState, changeToken } from '@/store/slice/Login'
import { gotoPhoneLogin } from '@/api/login'
import loginInfo from '@/config/token'
import { getLoginInfo, setLoginInfo } from '@/utils/secretKey'
import md5 from 'js-md5'
import { message } from 'antd'

//请求歌曲详细信息
interface LoginParam {
  username: string
  password: string
  tip?: boolean
}
const getLoginProfileInfo = createAsyncThunk<
  any,
  LoginParam,
  {
    dispatch: any
    state: any
  }
>('login/getLoginProfileInfo', async ({ username, password, tip }: LoginParam, { dispatch }) => {
  gotoPhoneLogin({ phone: username, md5_password: md5(password) }).then(res => {
    if (res.code !== 200) {
      message.error('账号或密码错误')
    } else {
      tip && message.success('登录成功')
      // 登录成功
      document.cookie = res.cookie
      // 保存登录信息
      dispatch(changeProfileInfo(res && res.profile))
      // 更改登录状态
      dispatch(changeLoginState(true))
      dispatch(changeToken(res.token))
      dispatch(changeCookie(res.cookie))
      // 更改登录状态
      loginInfo.username = username
      loginInfo.password = password
      loginInfo.state = true
      let newLoginInfo = Object.assign(getLoginInfo('loginInfo'), loginInfo)
      setLoginInfo('loginInfo', newLoginInfo)
      // 关闭模态框
      dispatch(changeIsVisible(false))
    }
  })
})
export { getLoginProfileInfo }
