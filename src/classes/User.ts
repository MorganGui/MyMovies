export default class User {
  id: number
  token: string

  constructor(id: number, token: string) {
    this.id = id
    this.token = token
  }

  static async getAuth(id: number, token: string) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await fetch('https://api.themoviedb.org/3/authentication/token/new', options)
    const data = await res.json()

    if (data.success) {
      return new User(id, token)
    }
  }
}
