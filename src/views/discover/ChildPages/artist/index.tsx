import ArtistCategory from './components/ArtistCategory'
import { getArtistsList } from '@/api/artist'
import ArtistCover from '@/components/ArtistCover'
import Pagination from '@/components/Pagination'
import './index.less'
// TODO 完成歌手
const ArtistList: React.FC = () => {
  const [params] = useSearchParams()
  const area = params.get('area')
  const type = params.get('type')
  const cat = params.get('cat')
  const [artistList, setArtistList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    getArtistsList(type, area, cat, currentPage).then((res) => {
      setArtistList(res.artists)
    })
  }, [area, type, cat, currentPage])
  function onPageChange(page: React.SetStateAction<number>) {
    window.scroll(0, 0)
    setCurrentPage(page)
  }
  return (
    <div className="ArtistListWrapper">
      <div className="Artist-list-content wrap-v2">
        <div className="ArtistListLeft">
          <div className="Artist-list-container">
            <ArtistCategory />
          </div>
        </div>
        <div className="ArtistListRight">
          <div className="artistList">
            {artistList
              && artistList.map((item) => {
                return (
                  <ArtistCover
                    key={item.id}
                    id={item.id}
                    coverPic={item.picUrl}
                    singer={item.name}
                  />
                )
              })}
          </div>
          <Pagination
            currentPage={currentPage}
            total={200}
            pageSize={35}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  )
}
export default ArtistList
