import SongsCategory from '../SongsCategory'
import { selectCurrentCategory } from '@/store/slice/SongList'
import './index.less'
const SongsHeader: React.FC = () => {
  const [showCategory, setShowCategory] = useState(false)
  const currentCategory = useAppSelector(selectCurrentCategory).data
  return (
    <div className="SongsHeaderWrapper">
      <div className="SongsHeaderLeft">
        <span className="title">{currentCategory || '全部'}</span>
        <button
          className="select"
          onClick={() => setShowCategory(!showCategory)}
        >
          <span>选择分类</span>
          <i className="sprite_icon2"></i>
        </button>
        {showCategory ? <SongsCategory /> : null}
      </div>
      <div className="SongsHeaderRight">
        <button className="hot">热门</button>
      </div>
    </div>
  )
}
export default SongsHeader
