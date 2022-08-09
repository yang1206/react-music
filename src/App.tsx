import { HashRouter } from 'react-router-dom'
import Router from '@/routers/index'
import PlayerBar from '@/views/player/PlayerBar'
const App = () => {
  return (
    <HashRouter>
      <Router />
      <PlayerBar />
    </HashRouter>
  )
}
export default App
