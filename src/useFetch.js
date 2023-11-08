import { useState } from "react";
import axios from "axios";

export function useFetch(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  async function getData(dataUrl) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(dataUrl);
      setError(null);
      setData(response.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function refetch({ params }) {
    const { _limit } = params;
    for (let i = 1; i <= _limit; i++) {
      await delay(1500);
      if (i < _limit) {
        console.log("wrong attempt");
        getData(url + "x"); // wrong url to simulate errors
      } else {
        console.log("correct attempt");
        getData(url); // correct url on final attempt
      }
    }
  }

  return { data, isLoading, error, refetch };
}

function delay(delayTime) {
  return new Promise((resolve) => setTimeout(resolve, delayTime));
}
