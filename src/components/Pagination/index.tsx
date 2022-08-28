import React, { memo } from 'react'
import { Pagination } from 'antd'
import './index.less'
interface Props {
  currentPage: number
  total: number
  onPageChange: (currentPage: number) => void
  pageSize?: number
}
const CustomPagination: React.FC<Props> = props => {
  const { currentPage, total, onPageChange } = props
  // render function
  const itemRender = (_page: any, type: string, originalElement: any) => {
    if (type === 'prev') {
      return <button className="control prev"> &lt; 上一页</button>
    }
    if (type === 'next') {
      return <button className="control next">下一页 &gt;</button>
    }
    return originalElement
  }

  return (
    <div className="PaginationWrapper">
      <Pagination
        className="pagination"
        size="small"
        current={currentPage}
        defaultCurrent={1}
        total={total}
        pageSize={35}
        showSizeChanger={false}
        itemRender={itemRender}
        onChange={onPageChange}
      />
    </div>
  )
}
export default memo(CustomPagination)
