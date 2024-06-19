import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/fetch-hook";
import classes from "./MovieList.module.css";
import MovieDetail from "./MovieDetail";

const MovieList = (props) => {
  const [selectedMovie, setSelectedMovie] = useState();
  const [dataMovie, setDataMovie] = useState({});
  const containerRef = useRef();
  const { data, isLoading, error } = useFetch(props.url);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    let isDragStart = false,
      prevPageX,
      prevScrollLeft;

    const slider = containerRef.current;
    if (!slider) return;

    // bắt đầu click chuột vào ảnh
    const dragStart = (e) => {
      e.preventDefault();
      e.stopPropagation();
      isDragStart = true;
      prevPageX = e.pageX;
      prevScrollLeft = slider.scrollLeft;
    };
    // khi đang kéo chuột sang trái - phải
    const dragging = (e) => {
      if (!isDragStart) return;
      e.preventDefault();
      let positionDiff = e.pageX - prevPageX;
      slider.scrollLeft = prevScrollLeft - positionDiff;
      setDragging(true);
    };
    // khi buông chuột
    const dragStop = (e) => {
      e.preventDefault();
      isDragStart = false;
      setTimeout(() => setDragging(false), 500);
    };

    slider.addEventListener("mousedown", dragStart);
    slider.addEventListener("mousemove", dragging);
    slider.addEventListener("mouseup", dragStop);

    return () => {
      slider.removeEventListener("mousedown", dragStart);
      slider.removeEventListener("mousemove", dragging);
      slider.removeEventListener("mouseup", dragStop);
    };
  }, [data]);

  const clickImageHandle = (e) => {
    // Khi đang dragging thì vô hiệu hóa click
    if (dragging) return;
    e.preventDefault();
    selectedMovie?.id === e.target.id
      ? setSelectedMovie()
      : setSelectedMovie({ id: e.target.id, src: e.target.src });

    // tìm index của movie vừa được click
    const index = data.results.findIndex(
      (movie) => movie.id === parseInt(e.target.id)
    );

    setDataMovie({ ...data.results[index] });
  };

  return (
    <div className={classes["wrap-list"]}>
      {props.title && <span className={classes.title}>{props.title}</span>}
      {isLoading && <p className={classes.loading}>Loading...</p>}
      {error && (
        <p className={classes["not-found"]}>Đã có lỗi xảy ra: {error}</p>
      )}
      {data && (
        <div className={classes["movie-list"]} ref={containerRef}>
          {data.results.map((img, index) => (
            <img
              className={props.isPoster ? classes.poster : classes.backdrop}
              src={`https://image.tmdb.org/t/p/original/${
                props.isPoster ? img.poster_path : img.backdrop_path
              }`}
              id={img.id}
              alt="poster-original"
              key={index}
              onClick={clickImageHandle}
            />
          ))}
        </div>
      )}
      {selectedMovie && <MovieDetail data={dataMovie} />}
    </div>
  );
};

export default MovieList;
