import { useEffect, useState } from 'react'

import Input from '../components/Input'

import Movie from '../classes/Movie'
import User from '../classes/User'
import Swal from 'sweetalert2'

export default ({ user }: { user: User }) => {
  const [movies, setMovies] = useState([] as Movie[])
  const [search, setSearch] = useState('')

  useEffect(() => {
    Movie.getPopular(user.token).then(res => {
      setMovies(res)
    })
  }, [movies])

  function handleSearch(newVal: string) {
    setSearch(newVal)

    if (newVal === '') {
      Movie.getPopular(user.token).then(res => {
        setMovies(res)
      })
    } else {
      Movie.getSearched(user.token, newVal).then(res => {
        setMovies(res)
      })
    }
  }

  async function toggleFavorie(movie: Movie) {
    Swal.showLoading()
    await movie.toggleFavorite(user.token, user.id)
    Swal.close()
  }

  return (
    <>
      <div className="mb-6">
        <Input placeholder="Rechercher" clearable value={search} setValue={handleSearch} required={false} />
      </div>
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
    </>
  )
}
