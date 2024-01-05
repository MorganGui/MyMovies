import { NavLink, useLocation } from 'react-router-dom'

export default () => {
  const { pathname } = useLocation()

  return (
    <nav>
      <NavLink to="/" className={pathname === '/' ? 'active py-2 px-6' : ' py-2 px-6'}>Populaire</NavLink><hr />
      <NavLink to="/favories" className="py-2 px-6">Favoris</NavLink>
    </nav>
  )
}