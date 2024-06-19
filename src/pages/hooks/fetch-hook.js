import { useState, useEffect } from "react";

// tham số isBanner để return về element srcImg DOM gắn vào <img src={srcImg} />
// mặc định chỉ có fetchNetflixOriginals là cần tham số này
const useFetch = (url, isBanner = false) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [srcImg, setSrcImg] = useState("");
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          setData();
          throw new Error("Request failed!");
        }

        const responseData = await response.json();

        // lấy ảnh ngẫu nhiên làm banner
        if (isBanner) {
          const randomNumber = Math.floor(
            Math.random() * responseData.results.length - 1
          );
          setSrcImg(
            "https://image.tmdb.org/t/p/original/" +
              responseData.results[randomNumber].backdrop_path
          );
        }

        setData(responseData);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, isBanner]);
  return { data, isLoading, error, srcImg };
};

export default useFetch;
