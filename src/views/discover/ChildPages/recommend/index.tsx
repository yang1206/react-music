import Banner from './components/banner'
import HotRecommend from './components/hotRecommend'
import NewAlbum from './components/newAlbum'
import Ranking from './components/ranking'
import './index.less'
const Recommend: React.FC = () => {
  return (
    <div className="RecommendWarper">
      <Banner />
      <div className="Content wrap-v2">
        <div className="RecommendLeft">
          <HotRecommend />
          <NewAlbum />
          <Ranking />
        </div>
      </div>
    </div>
  )
}
export default Recommend
