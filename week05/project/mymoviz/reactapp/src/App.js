import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardGroup, Container, Row } from 'reactstrap';
import { Movie } from "./components/Movie"
import { Header } from "./components/Header"

function App() {
  const [movieList, setMovieList] = useState([])
  const [moviesWishList, setMoviesWishList] = useState([])
  const [moviesCount, setMoviesCount] = useState(0);

  // Fetching datas from the API on launch and filling the wishlist with existing data from the database
  useEffect(() => {
    async function loadDataMovies() {
      var rawData = await fetch('/new-movies');
      var data = await rawData.json();
      for (const elem of data.movies) {
        setMovieList(prevState => [...prevState, elem])
      }
      var rawMovieListResponse = await fetch('/wishlist-movie')
      var movieListResponse = await rawMovieListResponse.json();
      var tab = []
      for (const elem of movieListResponse.movies) {
        tab.push(elem);
      }
      setMoviesWishList(tab);
    }
    loadDataMovies()
  }, []);

  // Functions to add and delete in the database
  async function postDataMovie(title, img) {
    await fetch('/wishlist-movie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `movieName=${title}&movieImg=${img}`
    })
  }
  async function deleteDataMovie(title) {
    await fetch(`/wishlist-movie/${title}`, {
      method: 'DELETE'
    });
  }

  // Handlers
  var handleClickAddMovieParent = (movieName, movieLike, movieImg) => {
    if (movieLike) {
      setMoviesWishList(moviesWishList.filter(elem => elem.title !== movieName))
      setMoviesCount(moviesCount - 1);
      deleteDataMovie(movieName);
    } else {
      setMoviesWishList([...moviesWishList, { title: movieName, img: movieImg }])
      setMoviesCount(moviesCount + 1);
      postDataMovie(movieName, movieImg)
    }
  }

  var clickWishListItemParent = (movieTitle) => {
    setMoviesWishList(moviesWishList.filter(elem => elem.title !== movieTitle))
    deleteDataMovie(movieTitle);
    setMoviesCount(moviesCount - 1);
  }

  // Looping to fill array of movies
  var movieListComponent = movieList.map((movie, i) => {
    let liked = false;
    // Checking whether the movie is liked of not
    var result = moviesWishList.find(element => element.title === movie.title)
    if (result !== undefined) {
      liked = true;
    }
    // Checking whether the movie had an existing path for its poster
    var movieUrl
    if (movie.backdrop_path.length > 0) {
      movieUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
    } else {
      movieUrl = "/img/generique.jpeg"
    }
    return (<Movie key={i}
      movieName={movie.title}
      movieDesc={movie.overview}
      movieImg={movieUrl}
      globalRating={movie.vote_average}
      globalRatingCount={movie.vote_count}
      handleClickAddMovieParent={handleClickAddMovieParent}
      wishList={moviesWishList}
      isLiked={liked}
    />)
  })

  // Display
  return (
    <div style={{ 'backgroundColor': 'black' }}>
      <Container>
        <Row>
          <div>
            <Header count={moviesWishList.length} movieList={moviesWishList} wishListClick={clickWishListItemParent} />
          </div>
          <CardGroup>
            {movieListComponent}
          </CardGroup>
        </Row>
      </Container>
    </div >
  );
}

export default App;
