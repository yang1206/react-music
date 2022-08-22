import { useEffect } from 'react'
import { BackTop, Layout } from 'antd'
import { Outlet /*, useLocation */ } from 'react-router-dom'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useAppDispatch } from '@/hooks/useStore'
import initLoginInfo from '@/config/token'
import { setLoginInfo, getLoginInfo } from '@/utils/secretKey'
import { getLoginProfileInfo } from '@/store/slice/Login'
import { getSongDetailArray } from '@/store/slice/Player'
import { useGlobalKeyboardEvent } from '@/hooks/useKeyboard'
import { addPlaylistId, getCurrentSongIndex, getPlaylistId, initCurrentSongIndex } from '@/utils/storage'
import { SONG_PLAYLIST_ID as songPlayListId } from '@/common/constants'
import Header from '@/layouts/components/Header'
import Footer from '@/layouts/components/Footer'
const { Content } = Layout
const LayoutIndex = () => {
  // redux hook
  const dispatch = useAppDispatch()

  // 初始化
  const initLogin = () => {
    // 存在登录信息
    if (localStorage.getItem('loginInfo') != null) {
      const { username, password } = getLoginInfo('loginInfo')
      username && password ? dispatch(getLoginProfileInfo({ username: username, password: password })) : ''
    }
    // 不存在登录信息
    else {
      setLoginInfo('loginInfo', initLoginInfo)
    }
  }
  initLogin()

  // 添加默认歌曲ID(本地存储默认歌曲id)
  useEffect(() => {
    addPlaylistId(songPlayListId)
    // 初始化音乐索引
    initCurrentSongIndex()
  }, [])

  // 本地存储读取歌曲列表ID
  useEffect(() => {
    //动态获取locals store音乐索引
    const index = getCurrentSongIndex()
    dispatch(getSongDetailArray({ listId: getPlaylistId(), index: index }))
  }, [dispatch])
  //全局唤醒搜索框hook
  useGlobalKeyboardEvent()
  // const { pathname } = useLocation()
  // console.log(pathname)
  return (
    <Layout>
      <Header />
      <Content>
        {/* TransitionGroup 会导致 useEffect 加载两次 && 使用路由懒加载第一次进入没有动画，所以暂时不用过渡动画了 */}
        {/* <TransitionGroup className="content"> */}
        {/* exit：表示退出当前页面的时候是否有动画 */}
        {/* <CSSTransition key={pathname} timeout={200} classNames="page" unmountOnExit> */}
        <Outlet />
        {/* </CSSTransition>
        </TransitionGroup> */}
      </Content>
      <Footer />
      <BackTop />
    </Layout>
  )
}
export default LayoutIndex
