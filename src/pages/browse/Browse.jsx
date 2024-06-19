import React from "react";
import NavBar from "./NavBar";
import "./Browse.css";
import useFetch from "../hooks/fetch-hook";
import MovieList from "./MovieList";
import { requests } from "../urls/urls";

function Browse() {
  // trong useFetch nếu đối số thứ 2 là true thì sẽ get ảnh banner
  const { srcImg } = useFetch(requests.fetchNetflixOriginals, true);
  return (
    <div className="app">
      <div className="top-section">
        <NavBar />
        <img src={srcImg} alt="banner" className="banner" />
      </div>
      {/* prop isPoster = true thì lấy ảnh dọc từ thuộc tính poster_path, false thì lấy ảnh ngang từ backdrop_path */}
      <div className="bottom-section">
        <MovieList url={requests.fetchNetflixOriginals} isPoster={true} />
        <MovieList url={requests.fetchTrending} title="Xu hướng" />
        <MovieList url={requests.fetchTopRated} title="Xếp hạng cao" />
        <MovieList url={requests.fetchActionMovies} title="Hành động" />
        <MovieList url={requests.fetchComedyMovies} title="Hài" />
        <MovieList url={requests.fetchHorrorMovies} title="Kinh dị" />
        <MovieList url={requests.fetchRomanceMovies} title="Lãng mạn" />
        <MovieList url={requests.fetchDocumentaries} title="Tài liệu" />
      </div>
    </div>
  );
}

export default Browse;
