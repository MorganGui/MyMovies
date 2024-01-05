export default class Movie {
  title: string
  img: string

  constructor(title: string, img: string) {
    this.title = title
    this.img = img
  }

  private static dataToInstance(data: any) {
    return new Movie(data.title, data.poster_path)
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

    const res = await fetch('https://api.themoviedb.org/3/movie/popular', options)
    if (res.status === 200) {
      const data = await res.json()
      for (const result of data.results) {
        list.push(this.dataToInstance(result))
      }
    }

    return list
  }

  static async search(token: string, search: string) {
    const list: Movie[] = []

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search.replaceAll(' ', '+')}`, options)
    if (res.status === 200) {
      const data = await res.json()
      for (const result of data.results) {
        list.push(this.dataToInstance(result))
      }
    }

    return list
  }

  static async addFavorite(userId: number, token: string) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    
    fetch(`https://api.themoviedb.org/3/account/${userId}/favorite`, options)
      .then(response => response.json())
      .then(response => console.log(response))
  }
}
