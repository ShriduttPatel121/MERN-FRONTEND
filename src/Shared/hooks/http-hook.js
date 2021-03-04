import { useState, useCallback, useRef, useEffect } from "react";
export const useHttpClient = () => {
  const [isLoading, setIsLoding] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequest = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      console.log(url + " " + method + " " + body + " ");
      try {
        setIsLoding(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl);
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (a) => a !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoding(false);
        return responseData;
      } catch (e) {
        setError(e.message || "Somthing went wrong.");
        setIsLoding(false);
        throw new Error(e.message);
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((a) => a.abort());
    };
  }, []);

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
