import { Tabs } from 'antd'
import { getArtists, getArtistsAlbum, getArtistsDesc } from '@/api/artist'
import NavBar from '@/components/NavBar'
import PlayList from '@/components/PlayList'
import AlbumCover from '@/components/AlbumCover'
import './index.less'
const Artist: React.FC = () => {
  const [params] = useSearchParams()
  const id = params.get('id')
  const [artistDetail, setArtist] = useState<{ [key: string]: any }>({})
  const [SongList, setSongList] = useState<any[]>([])
  const [AlbumList, setAlbumList] = useState<any[]>([])
  const [artistDesc, setArtistDesc] = useState<string>('')
  const [descIntroduction, setDescIntroduction] = useState<any[]>([])
  const artistImg = artistDetail && artistDetail.picUrl
  const artistName = artistDetail && artistDetail.name
  const artistAlias
    = artistDetail && artistDetail.alias && artistDetail.alias[0]
  useEffect(() => {
    getArtists(id).then((res) => {
      setArtist(res.artist)
      setSongList(res.hotSongs)
    })
    getArtistsAlbum(id).then((res) => {
      setAlbumList(res.hotAlbums)
    })
    getArtistsDesc(id).then((res) => {
      setArtistDesc(res.briefDesc)
      setDescIntroduction(res.introduction)
    })
  }, [params, id])
  const CoverProps = {
    width: '150px',
    size: '130px',
    bgp: '-845px',
  }
  const items = [
    {
      label: '热门作品',
      key: '1',
      children: (
        <div style={{ marginTop: '20px' }}>
          <PlayList playlist={SongList} />
        </div>),

    },
    {
      label: '所有专辑',
      key: '2',
      children: (<div className="Album-list">
        {AlbumList
          && AlbumList.map((item, index: number) => {
            return (
              <div key={index} className="HotAlbum-item">
                <AlbumCover info={item} {...CoverProps} />
              </div>
            )
          })}
      </div>),

    },
    {
      label: '相关MV',
      key: '3',
      children: (
        <div className="mv">
          <h1>暂无MV</h1>
        </div>
      ),

    },
    {
      label: '艺人介绍',
      key: '4',
      children:
        (<div className="desc">
          <div className="item">
            <p>{artistName}简介</p>
            <span>{artistDesc}</span>
          </div>
          {descIntroduction
            && descIntroduction.map((item, index) => {
              return (
                <div key={index} className="item">
                  <h2>{item.ti}</h2>
                  <span>{item.txt}</span>
                </div>
              )
            })}
        </div>
        ),
    },

  ]
  return (
    <>
      <NavBar />
      <div className="ArtistDetailWrapper wrap-v2">
        <div className="artist_info">
          <div className="header">
            <p className="name">
              <span className="realName">{artistName}</span>
              <span className="alias">{artistAlias}</span>
            </p>
            <img src={artistImg} alt="" />
          </div>
          <div className="main">
            <div className="card-container">
              <Tabs items={items} destroyInactiveTabPane={true} type="card">
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Artist
