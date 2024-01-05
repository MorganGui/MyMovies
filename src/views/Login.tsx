import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import Input from '../components/Input'

import User from '../classes/User'

export default ({ user, setUser }: { user: User | null, setUser: Function }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (user) {
      logout()
    }
  }, [])

  async function submit(e: FormEvent) {
    e.preventDefault()

    Swal.showLoading()
    const user = await User.getAuth(parseFloat(userId), token)
    Swal.close()

    if (user) {
    localStorage.setItem('account-id', userId)
    localStorage.setItem('token', token)
      setUser(user)
      Swal.fire({
        title: 'Connexion réussie',
        icon: 'success',
        timer: 1000
      }).then(() => {
        navigate('/')
      })

    } else {
      Swal.fire({
        title: 'Clé invalide',
        icon: 'error'
      })
    }
  }
  function logout() {
    setUser(null)
    localStorage.removeItem('account-id')
    localStorage.removeItem('token')
  }

  return (
    <div className="card">
      <h2>Connexion</h2>
      <form onSubmit={submit}>
        <Input placeholder="Id du compte" required clearable value={userId} setValue={setUserId} />
        <Input placeholder="Token TMDB" required clearable value={token} setValue={setToken} />
        <button type="submit">Valider</button>
      </form>
    </div>
  )
}
