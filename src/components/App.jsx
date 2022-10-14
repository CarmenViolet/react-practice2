import { Component } from 'react';
import { MoviesGallery } from './MoviesGallery/MoviesGallery';
import { mapper } from 'utils/mapper';
import { Modal } from './Modal/Modal';
import { fetchApi } from 'api/api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    movies: [],
    currentImage: null,
    page: 1,
    isLoading: false,
    error: null,
    isShown: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isShown, page } = this.state;
    if ((prevState.isShown !== isShown && isShown) || prevState.page !== page) {
      this.fetchMovies();
    }
  }

  componentDidMount() {
    const movies = localStorage.getItem('movies');
    if (movies) {
      this.setState({ movies: JSON.parse(movies) });
    }
  }

  deleteMovie = movieId => {
    this.setState(prevState => ({
      movies: prevState.movies.filter(movie => movie.id !== movieId),
    }));
  };

  updateCurrentImage = data => {
    this.setState({ currentImage: data });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  shownFilms = () => {
    if (this.state.isShown) {
      this.setState({ movies: [] });
    }
    this.setState(prevState => ({ isShown: !prevState.isShown }));
  };

  fetchMovies = () => {
    const page = this.state.page;
    this.setState({ isLoading: true });
    fetchApi(page)
      .then(resp =>
        this.setState(prevState => ({
          movies: [...prevState.movies, ...mapper(resp.data.results)],
        }))
      )
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(this.setState({ isLoading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { movies, currentImage, isShown, isLoading } = this.state;

    return (
      <>
        <Button
          text={!isShown ? 'Show Movies' : 'Hide Movies'}
          handlerClick={this.shownFilms}
        />
        {isShown && (
          <MoviesGallery
            movies={movies}
            deleteMovie={this.deleteMovie}
            openModal={this.updateCurrentImage}
          />
        )}
        {!isLoading && <Button text="Load More" handlerClick={this.loadMore} />}
        {isLoading && <Loader />}
        {currentImage && (
          <Modal image={currentImage} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
