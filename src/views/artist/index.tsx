import React, { memo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getArtists } from '@/api/artist'
import NavBar from '@/components/NavBar'
import './index.less'
const Artist: React.FC = () => {
  const [params] = useSearchParams()
  const id = params.get('id')
  useEffect(() => {
    getArtists(id).then(res => {
      console.log(res)
    })
  }, [params, id])
  return (
    <div className="ArtistDetailWrapper w980">
      <NavBar />
    </div>
  )
}
export default memo(Artist)
