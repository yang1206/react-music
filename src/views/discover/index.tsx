import { Outlet } from 'react-router-dom'
import NavBar from '@/components/NavBar'
const Discover: React.FC = () => {
  return (
    <div className="DiscoverWrapper">
      <NavBar />
      <Outlet />
    </div>
  )
}
export default Discover
