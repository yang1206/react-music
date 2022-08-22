import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { RootState } from '@/store'
type InitialState = {
  isVisible: boolean
  isLogin: boolean
  profile: string
  token: string
  cookie: string
}
const initialState: InitialState = {
  isVisible: false,
  isLogin: false, // 登录状态
  profile: '',
  token: '',
  cookie: ''
}

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeIsVisible: (state, { payload }: any) => {
      state.isVisible = payload
    },
    changeLoginState: (state, { payload }: any) => {
      state.isLogin = payload
    },
    changeProfileInfo: (state, { payload }: any) => {
      state.profile = payload
    },
    changeToken: (state, { payload }: any) => {
      state.token = payload
    },
    changeCookie: (state, { payload }: any) => {
      state.cookie = payload
    }
  }
  // extraReducers: builder => {
  //   // 进行请求阶段的一些操作
  //   builder.addCase(getSongListDetailData.fulfilled, (state, action) => {
  //     state.songListDetailInfo.playList = action.payload.playlist
  //     state.songListDetailInfo.privileges = action.payload.privileges
  //   })
  // }
})
//提前取出保存的数据并导出
export const selectIsVisible = (state: RootState) => ({ data: state.login.isVisible, shallowEqual })
export const selectLoginState = (state: RootState) => ({ data: state.login.isLogin, shallowEqual })
export const selectProfile = (state: RootState) => ({ data: state.login.profile, shallowEqual })
export const selectToken = (state: RootState) => ({ data: state.login.token, shallowEqual })
export const selectCookie = (state: RootState) => ({ data: state.login.cookie, shallowEqual })
export const { changeIsVisible, changeProfileInfo, changeCookie, changeLoginState, changeToken } = LoginSlice.actions
export default LoginSlice.reducer
//统一导出异步action
// export { getSongListDetailData }
