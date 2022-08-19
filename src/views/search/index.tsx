import { memo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Input, Tabs } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectSingleSongList, getSearchSongList } from '@/store/slice/Search'
import './index.less'
const SearchContent: React.FC = () => {
  const singleSongList = useAppSelector(selectSingleSongList).data
  console.log(singleSongList)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getSearchSongList({ keywords: '普通朋友', type: 1 }))
  })
  const { TabPane } = Tabs
  const { Search } = Input
  const [params] = useSearchParams()
  const song = params.get('song')
  return (
    <div className="SearchWrapper ">
      <div className="wrap-v2 content">
        <div className="search-wrapper">
          <Search style={{ width: 490 }} />
        </div>
        <div className="search-content">
          <div className="search-info">
            <span>搜索{song}, 找到</span>
            <span className="music-amount"> 20 </span>单曲
          </div>
          <div className="card-container">
            <Tabs type="card">
              <TabPane tab="Tab 1" key="1">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(SearchContent)
