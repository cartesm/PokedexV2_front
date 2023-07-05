import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Protector from './ProtectedRoutes'
import Header from './components/Header'
import AuthContext from './context/auth.context'
import PokeContext from './context/poke.context'
import Page from './pages/Content'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <AuthContext>
      <PokeContext>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/pokemon/:id' element={<Page />} />
            <Route path='/login' element={<Login />} />

            <Route element={<Protector/>}>
              <Route path='/favorites' element={<Favorites />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PokeContext>

    </AuthContext>
  )
}

export default App
