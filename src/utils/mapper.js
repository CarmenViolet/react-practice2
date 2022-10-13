export const mapper = (movies) => {
    return movies.map(({id, title, backdrop_path: image, vote_count: votes}) => ({id, title, image, votes}))
}