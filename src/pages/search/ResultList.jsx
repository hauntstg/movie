import React, { useRef, useState } from "react";
import { requests } from "../urls/urls";
import useFetch from "../hooks/fetch-hook.js";
import classes from "./ResultList.module.css";
import ShowModal from "./ShowModal.jsx";
export default function ResultList(props) {
  // dataMovie truyền cho Portal hiển thị trên popup
  const [dataMovie, setDataMovie] = useState({});
  const containerRef = useRef();
  // modalRef hiển thị popup
  const modalRef = useRef();
  // url + query
  const query = props.keyword.replace(" ", "+");
  const urlSearch = requests.fetchSearch + "&query=" + query;
  const { data, isLoading, error } = useFetch(urlSearch);

  // hàm click vào ảnh để hiển thị trailer
  function clickImageHandle(e) {
    const index = data.results.findIndex(
      (movie) => movie.id === parseInt(e.target.id)
    );

    setDataMovie({ ...data.results[index] });
    modalRef.current.style.display = "block";
    // ononSetOpacity(true) để làm nền mờ khi popup được bật lên
    props.onSetOpacity(true);
  }

  // hàm click vào nút 'Close' trên popup
  function closeModalHandler() {
    // unmount popup
    setDataMovie({});
    modalRef.current.style.display = "none";
    props.onSetOpacity(false);
  }

  return (
    <>
      <ShowModal ref={modalRef} data={dataMovie} onClose={closeModalHandler} />
      <div className={classes["wrap-list"]}>
        {data && data.total_results > 0 && (
          <span className={classes.title}>Result Search</span>
        )}
        {isLoading && query && <p className={classes.loading}>Loading...</p>}
        {!isLoading && data && (
          <div className={classes["movie-list"]} ref={containerRef}>
            {data.results.map(
              (img, index) =>
                img.poster_path && (
                  <img
                    className={
                      props.isPoster ? classes.poster : classes.backdrop
                    }
                    src={`https://image.tmdb.org/t/p/original/${img.poster_path}`}
                    id={img.id}
                    alt="poster-original"
                    key={index}
                    onClick={clickImageHandle}
                  />
                )
            )}
          </div>
        )}
        {!isLoading && query && data && data.total_results === 0 && (
          <p className={classes["not-found"]}>
            Không tìm thấy kết quả phù hợp.
          </p>
        )}
        {!isLoading && query && !data && error && (
          <p className={classes["not-found"]}>Đã có lỗi xảy ra: {error}</p>
        )}
      </div>
    </>
  );
}
