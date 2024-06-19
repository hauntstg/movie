import React, { useState } from "react";
import NavBar from "../browse/NavBar";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import classes from "./Search.module.css";

const Search = () => {
  const [opacity, setOpacity] = useState(false);
  const [keyword, setKeyword] = useState("");

  function setOpacityHandler(e) {
    setOpacity(e);
  }

  // class active trong index.css để làm mờ background khi hiển thị popup
  return (
    <div className={`${classes.search} ${opacity ? " active" : ""}`}>
      <NavBar />
      <SearchForm
        onSearch={(string) => {
          setKeyword(string);
        }}
      />
      <ResultList keyword={keyword} onSetOpacity={setOpacityHandler} />
    </div>
  );
};

export default Search;
