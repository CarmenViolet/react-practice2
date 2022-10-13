export const MoviesGallery = ({movies, deleteMovie, openModal}) => {
    return (
        <>
        <ul>
            {movies.map(({id, title, votes, image}) => {
                return (
                    <li key={id}>
                        <h2>{title}</h2>
                        <p>Votes count: {votes}</p>
                        <button type="button" onClick={() => openModal({src: image, alt: title})}>Open Poster</button>
                        <button type="button" onClick={() => deleteMovie(id)}>Delete</button>
                    </li>
                )
            })}
        </ul>
        </>
    )
}