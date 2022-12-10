import AlbumInfo from './components/AlbumInfo'
import NavBar from '@/components/NavBar'
import { getAlbumDetail } from '@/api/album'
import './index.less'
const Album: React.FC = () => {
  const [albumDetail, setAlbum] = useState()
  const [params] = useSearchParams()
  const id = params.get('id')
  useEffect(() => {
    getAlbumDetail(id).then((res) => {
      setAlbum(res)
    })
  }, [id, params])
  return (
    <>
      <NavBar />
      <div className="AlbumDetailWrapper">
        <div className="AlbumDetailContent">
          <AlbumInfo albumDetail={albumDetail} />
        </div>
      </div>
    </>
  )
}
export default Album
