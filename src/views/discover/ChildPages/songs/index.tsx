import SongsHeader from './components/SongsHeader'
import SongsList from './components/SongsList'
import {
  changeCurrentCategory,
  getCategory,
  getPlayList,
} from '@/store/slice/SongList'
import './index.less'
const Songs: React.FC = () => {
  const [params] = useSearchParams()
  const dispatch = useAppDispatch()
  const cat: string | number = params.get('cat')
  useEffect(() => {
    dispatch(changeCurrentCategory(cat))
  }, [dispatch, cat])
  // hooks
  useEffect(() => {
    dispatch(getCategory())
    dispatch(getPlayList(0))
  }, [dispatch])
  return (
    <div className="playlistWrapper wrap-v2">
      <SongsHeader />
      <SongsList />
    </div>
  )
}
export default Songs
