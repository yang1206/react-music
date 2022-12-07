import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { getLoginProfileInfo } from './action'
import type { RootState } from '@/store'
interface InitialState {
  isVisible: boolean
  isLogin: boolean
  profile: {
    nickname: string
    avatarUrl: string
    gender: number
    [key: string]: any
  }
  token: string
  cookie: string
}
const initialState: InitialState = {
  isVisible: false,
  isLogin: false, // 登录状态
  profile: {
    nickname: '',
    avatarUrl: '',
    gender: null,
  },
  token: '',
  cookie: '',
}

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeIsVisible: (state, { payload }) => {
      state.isVisible = payload
    },
    changeLoginState: (state, { payload }) => {
      state.isLogin = payload
    },
    changeProfileInfo: (state, { payload }) => {
      state.profile = payload
    },
    changeToken: (state, { payload }) => {
      state.token = payload
    },
    changeCookie: (state, { payload }) => {
      state.cookie = payload
    },
  },
})
// 提前取出保存的数据并导出
export const selectIsVisible = (state: RootState) => ({
  data: state.login.isVisible,
  shallowEqual,
})
export const selectLoginState = (state: RootState) => ({
  data: state.login.isLogin,
  shallowEqual,
})
export const selectProfile = (state: RootState) => ({
  data: state.login.profile,
  shallowEqual,
})
export const selectToken = (state: RootState) => ({
  data: state.login.token,
  shallowEqual,
})
export const selectCookie = (state: RootState) => ({
  data: state.login.cookie,
  shallowEqual,
})
export const {
  changeIsVisible,
  changeProfileInfo,
  changeCookie,
  changeLoginState,
  changeToken,
} = LoginSlice.actions
export default LoginSlice.reducer
// 统一导出异步action
export { getLoginProfileInfo }
