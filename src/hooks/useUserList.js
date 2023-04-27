import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useUserList = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get("/user", {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return {
    users,
    isLoading,
    error
  }
}


export default useUserList;