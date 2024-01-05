import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className="card">
      <h2>Bienvenue sur MyMovies</h2>
      <p>
        Pour commencer, <Link to="/login">veuillez vous connecter.</Link>
      </p>
    </div>
  )
}
