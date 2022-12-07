import { memo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SongListInfo from './components/SongListInfo'
import NavBar from '@/components/NavBar'
import { useAppDispatch } from '@/hooks/useStore'
import { getSongListDetailData } from '@/store/slice/SongList'
import './index.less'
const PlayList: React.FC = () => {
  const [params] = useSearchParams()
  const id = params.get('id')
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getSongListDetailData(id))
  }, [id, params, dispatch])
  return (
    <>
      <NavBar />
      <div className="SongListWrapper">
        <div className="SongListContent">
          <SongListInfo />
        </div>
      </div>
    </>
  )
}
export default memo(PlayList)
