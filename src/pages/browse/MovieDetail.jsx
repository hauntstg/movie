import YouTube from "react-youtube";
import React from "react";
import useFetch from "../hooks/fetch-hook";
import classes from "./MovieDetail.module.css";
const API_KEY = "26aca73cc00eedccfee16b3cfae6784a";
const MovieDetail = (props) => {
  const { data: dataTrailer, isLoading: isLoadingTrailer } = useFetch(
    `https://api.themoviedb.org/3/movie/${props.data.id}/videos?api_key=${API_KEY}`
  );

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  // jsx nếu get data movie thành công
  let detailMovie = (
    <div className={classes["detail-movie"]}>
      <div className={classes.content}>
        <h2 className={classes.name}>{props.data.name ?? props.data.title}</h2>
        <p className={classes.releaseDate}>
          Release Date: {props.data.release_date ?? props.data.first_air_date}
        </p>
        <p className={classes.vote}>Vote: {props.data.vote_average}</p>
        <p className={classes.overview}>{props.data.overview}</p>
      </div>
      <div className={classes.video}>
        {dataTrailer?.results?.[0]?.key ? (
          <YouTube videoId={dataTrailer?.results?.[0].key} opts={opts} />
        ) : (
          <img
            className={classes["img-trailer"]}
            src={`https://image.tmdb.org/t/p/original/${props.data.backdrop_path}`}
            alt="trailer movie"
          />
        )}
      </div>
    </div>
  );
  let content;
  content = detailMovie;
  if (isLoadingTrailer) {
    content = <p className={classes.loading}>Loading...</p>;
  }
  return <>{content}</>;
};

export default MovieDetail;
