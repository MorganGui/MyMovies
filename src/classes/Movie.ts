export default class Movie {
  id: number
  title: string
  img: string
  favorite: boolean

  constructor(id: number, title: string, img: string, favorite: boolean) {
    this.id = id
    this.title = title
    this.img = img
    this.favorite = favorite
  }

  private static dataToInstance(data: any) {
    return new Movie(data.id, data.title, data.poster_path, false)
  }

  static async getPopular(token: string) {
    const list: Movie[] = []

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR', options)
    if (res.status === 200) {
      const data = await res.json()
      for (const result of data.results) {
        list.push(this.dataToInstance(result))
      }
    }

    await Promise.all(list.map(async movie => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/account_states`, options)
      const data = await res.json()
      movie.favorite = data.favorite
      return movie
    }))

    return list
  }
  static async getSearched(token: string, search: string) {
    const list: Movie[] = []

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search.replaceAll(' ', '+')}&language=fr-FR`, options)
    if (res.status === 200) {
      const data = await res.json()
      for (const result of data.results) {
        list.push(this.dataToInstance(result))
      }
    }

    await Promise.all(list.map(async movie => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/account_states`, options)
      const data = await res.json()
      movie.favorite = data.favorite
      return movie
    }))

    return list
  }

  async toggleFavorite(token: string, userId: number) {
    this.favorite = !this.favorite

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({media_type: 'movie', media_id: this.id, favorite: this.favorite})
    }

    await fetch(`https://api.themoviedb.org/3/account/${userId}/favorite`, options)
  }
  static async getFavorite(token: string, userId: number) {
    const list: Movie[] = []

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await fetch(`https://api.themoviedb.org/3/account/${userId}/favorite/movies?language=fr-FR`, options)
    if (res.status === 200) {
      const data = await res.json()
      for (const result of data.results) {
        list.push(this.dataToInstance(result))
      }
    }

    await Promise.all(list.map(async movie => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/account_states`, options)
      const data = await res.json()
      movie.favorite = data.favorite
      return movie
    }))

    return list
  }
}
