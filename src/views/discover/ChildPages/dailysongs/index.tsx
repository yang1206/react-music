import DateHeader from './components/Date'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { changeIsVisible, selectLoginState } from '@/store/slice/Login'
import { getRecommendsongs } from '@/api/recommend'
import RcmHeader from '@/components/RcmHeader'
import Authentication from '@/components/Authentication'
import PlayList from '@/components/PlayList'
import './index.less'
const DailySongs: React.FC = () => {
  const [recommendPlaylist, setRecommendPlaylist] = useState([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(selectLoginState).data
  // 获取推荐歌单列表
  useEffect(() => {
    isLogin
      && getRecommendsongs().then((res) => {
        const result = res.data
        setRecommendPlaylist(result.dailySongs)
      })
  }, [isLogin])
  const toRedirect = useCallback(() => {
    navigate('/', {
      replace: false,
    })
  }, [navigate])
  const showModal = useCallback(() => {
    dispatch(changeIsVisible(true))
  }, [dispatch])
  return (
    <div className="wrap-v2" style={{ border: 'solid 1px #d3d3d3' }}>
      <Authentication flag={isLogin} to={toRedirect} showModal={showModal} />
      <div
        className="DayRecommendContent daycontent"
        style={{ display: isLogin ? 'block' : 'none' }}
      >
        <div className="recommend-cover-bg">
          <DateHeader />
        </div>
        <div className="main">
          <RcmHeader title="包含歌曲列表" right={<></>} />
          <PlayList playlist={recommendPlaylist} />
        </div>
      </div>
    </div>
  )
}
export default DailySongs
