import { useEffect, useState } from 'react'

import Movie from '../classes/Movie'
import User from '../classes/User'

export default ({ user }: { user: User }) => {
  const [movies, setMovies] = useState([] as Movie[])

  useEffect(() => {
    Movie.getFavorite(user.token, user.id).then(res => {
      setMovies(res)
    })
  }, [movies])

  async function toggleFavorie(movie: Movie) {
    await movie.toggleFavorite(user.token, user.id)
  }

  return (
    <div className="d-flex flex-wrap justify-center gap-3">
      {
        movies.map((movie, index) => {
          if (movie.img) return (
            <div className="p-relative" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.img}`} />
                {
                  movie.favorite ?
                    <i className="button-fav fa-solid fa-heart fa-xl" onClick={() => toggleFavorie(movie)} /> :
                    <i className="button-fav fa-regular fa-heart fa-xl" onClick={() => toggleFavorie(movie)} />
                }
            </div>
          )
        })
      }
    </div>
  )
}