import SongInfo from './components/SongInfo'
import SongItem from './components/SongItem'
import SongComments from './components/SongComments'
import { getHotComment, selectSong } from '@/store/slice/Player'
import { getSongSimi } from '@/api/song'
import './index.less'
const Player: React.FC = () => {
  const dispatch = useAppDispatch()
  const [simiList, setSimiList] = useState([])
  const currentSong = useAppSelector(selectSong).data
  useEffect(() => {
    // 获取热评
    dispatch(getHotComment(currentSong.id))
    // 获取相似推荐歌曲
    getSongSimi({ id: currentSong.id }).then((res) => {
      setSimiList(res.songs)
    })
  }, [currentSong, dispatch])
  return (
    <div className="PlayerWrapper">
      <div className="content wrap-v2">
        <div className="PlayerLeft">
          <SongInfo />
          <SongComments />
        </div>
        <div className="PlayerRight">
          {simiList
            && simiList.map((item) => {
              return (
                <SongItem
                  key={item.id}
                  className="song_item"
                  // coverPic={index < 3?item.al.picUrl:''}
                  duration={formatMinuteSecond(item.dt)}
                  songName={item.name}
                  singer={item.artists[0].name}
                  songId={item.id}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
export default Player
