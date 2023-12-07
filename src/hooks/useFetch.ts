import { useState, useEffect } from "react";
import APIResponse from "../interfaces/APIResponse";

type FetchOptions<T> = {
  queryFn: () => Promise<APIResponse<T>>;
};

const useFetch = <T>(options: FetchOptions<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isError, setisError] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    options
      .queryFn()
      .then((response) => {
        setData(response.data);
        setisError(response.isError);
        setErrors(response.errors);
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after the request is complete
      });
  }, []);

  return {
    data,
    errors,
    isError,
    status,
    isLoading,
    setData,
  };
};
export default useFetch;
