import { memo } from 'react'
import { useSearchParams } from 'react-router-dom'
const Search: React.FC = () => {
  const [params] = useSearchParams()
  const song = params.get('song')
  return <div>你搜索的{song}</div>
}
export default memo(Search)
