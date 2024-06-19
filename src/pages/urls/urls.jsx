const API_KEY = "26aca73cc00eedccfee16b3cfae6784a";
export const requests = {
  fetchTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`,
};

// https://api.themoviedb.org/3/movie/550?api_key=26aca73cc00eedccfee16b3cfae6784a
// https://api.themoviedb.org/3/trending/all/week?api_key=26aca73cc00eedccfee16b3cfae6784a&language=en-US
// https://api.themoviedb.org/3/discover/tv?api_key=26aca73cc00eedccfee16b3cfae6784a&with_network=12

// image
// https://image.tmdb.org/t/p/original/backdrop_path
// https://image.tmdb.org/t/p/original/backdrop_path
// https://image.tmdb.org/t/p/w500/backdrop_path
