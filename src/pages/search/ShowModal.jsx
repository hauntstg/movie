import React, { forwardRef } from "react";
import { createPortal } from "react-dom";
import classes from "./ShowModal.module.css";
import MovieDetail from "../browse/MovieDetail";
export default forwardRef(function ShowModal({ data, onClose }, ref) {
  return createPortal(
    <div ref={ref} className={classes["result-modal"]}>
      <div className={classes.btn}>
        <button className={classes["btn-close"]} onClick={onClose}>
          Close
        </button>
      </div>
      <MovieDetail data={data} />
    </div>,
    document.getElementById("modal")
  );
});
