import { HashRouter } from 'react-router-dom'
import Router from '@/routers/index'
import PlayerBar from '@/views/player/PlayerBar'
import AuthRouter from '@/routers/utils/authRouter'
const App = () => {
  return (
    <HashRouter>
      <AuthRouter>
        <Router />
        <PlayerBar />
      </AuthRouter>
    </HashRouter>
  )
}
export default App
