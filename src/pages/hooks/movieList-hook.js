import { useEffect } from "react";

const useMovieList = (slide) => {
  let isDragStart = false,
    prevPageX,
    prevScrollLeft;

  const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = slide.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    let positionDiff = e.pageX - prevPageX;
    slide.scrollLeft = prevScrollLeft - positionDiff;
  };

  const dragStop = () => {
    isDragStart = false;
  };

  {
    slide && slide.addEventListener("mousedown", dragStart);
  }

  {
    slide && slide.addEventListener("mousemove", dragging);
  }

  {
    slide && slide.addEventListener("mouseup", dragStop);
  }
  return "";
};

export default useMovieList;
