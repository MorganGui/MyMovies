import './App.css'
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

import Home from './views/Home'
import Login from './views/Login'
import Popular from './views/Popular'
import Favories from './views/Favories'
import Error404 from './views/errors/Error404'

import Navigation from './components/Navigation'

import User from './classes/User'

export default () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(null as User | null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const tmp_id = localStorage.getItem('account-id')
    const tmp_token = localStorage.getItem('token')
    if (tmp_id && tmp_token) {
      login(tmp_id, tmp_token)
    }
  }, [])

  async function login(id: string, token: string) {
    setIsLoading(true)
    Swal.showLoading()

    const user = await User.getAuth(parseFloat(id), token)
    if (user) {
      setUser(user)
    }

    Swal.close()
    setIsLoading(false)
  }
  function logout() {
    setUser(null)
    localStorage.removeItem('account-id')
    localStorage.removeItem('token')
    navigate('/')
  }
  function debug() {
    console.log(user)
  }

  return (
    <>
      <div className="d-flex w-100 align-start header">
        <Link to="/" className="d-flex align-center pr-3">
          <img src={reactLogo} className="logo react" alt="React logo" />
          <h1 className="text-white">MyMovies</h1>
        </Link>
        <div className="spacer" />
        <a className="text-error pr-3 pointer" onClick={debug}>DEBUG</a>
        {
          location.pathname === '/login' ? '' :
          user ? <a className="pointer" onClick={logout}>Déconnexion</a> : <Link to="login">Connexion</Link>
        }
      </div>
      <div id="app">
        {
          user ? <Navigation /> : ''
        }
        {
          isLoading ? '' :
          <Routes>
            <Route path="/" element={ user ? <Popular user={user} /> : <Home /> } />
            <Route path="/favories" element={ user ? <Favories /> : <Error404 /> } />
  
            <Route path="/login" element={ <Login user={user} setUser={setUser} /> } />
          </Routes>
        }
      </div>
    </>
  )
}
