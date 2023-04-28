import useSWR from 'swr';
import { axiosPrivate } from '../api/axios'

const useUserList = () => {

  const fetcher = url => axiosPrivate.get(url).then(res => res.data);
  const { data: users, error, isLoading } = useSWR('/user', fetcher);

  return {
    users,
    isLoading,
    error
  }
}

export default useUserList;