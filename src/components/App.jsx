import { Component } from "react"
import { MoviesGallery } from "./MoviesGallery/MoviesGallery"
import movies from "../data/movies.json"
import { mapper } from "utils/mapper"
import { Modal } from "./Modal/Modal"

export class App extends Component {
  state = {
    movies: mapper(movies),
    currentImage: null,
  }
  
  componentDidUpdate(prevProps, prevState) {
    const {movies} = this.state;
    if(movies !== prevState.movies) {
      localStorage.setItem("movies", JSON.stringify(movies))
   }
  };

  componentDidMount() {
    const movies = localStorage.getItem('movies');
    if(movies) {
      this.setState({movies: JSON.parse(movies)})
    }
  }

  deleteMovie = (movieId) => {
  this.setState(prevState => ({
    movies: prevState.movies.filter(movie => movie.id !== movieId)
  }))  
  }

  updateCurrentImage = data => {
    this.setState({currentImage: data})
  }

  closeModal = () => {
    this.setState({currentImage: null})
  }

  render () {
    const {movies, currentImage} = this.state;

  return (
    <>
   <MoviesGallery movies={movies} deleteMovie={this.deleteMovie} openModal={this.updateCurrentImage}/>
   {currentImage && <Modal image={currentImage} closeModal={this.closeModal}/>}
   </>
  )
  }
};
