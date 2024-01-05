import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className="card">
      <h2>Erreur 404. Tu t'es perdu ?</h2>
      <p>
        Reviens <Link to="/">en lieu sûr</Link>.
      </p>
    </div>
  )
}
