import { useEffect, useState } from 'react'

import Movie from '../classes/Movie'
import User from '../classes/User'

export default ({ user }: { user: User }) => {
  const [movies, setMovies] = useState([] as Movie[])

  useEffect(() => {
    Movie.getFavorite(user.token, user.id).then(res => {
      setMovies(res)
    })
  }, [])

  async function toggleFavorie(movie: Movie) {
    await movie.toggleFavorite(user.token, user.id)
    Movie.getFavorite(user.token, user.id).then(res => {
      setMovies(res)
    })
  }

  return (
    <div className="d-flex flex-wrap justify-center gap-3">
      {
        movies.map((movie, index) => {
          if (movie.img) return (
            <div className="p-relative" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.img}`} />
              <i className="button-fav fa-solid fa-heart fa-xl" onClick={() => toggleFavorie(movie)} />
            </div>
          )
        })
      }
    </div>
  )
}