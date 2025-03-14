import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export type FetchDataParams = {
  endpoint: string;
} & Required<Pick<
  AxiosRequestConfig, 
  'method' | 'data'
>>

/**
 * Метод для запроса через axios
 */
const fetchData = <T>({
  endpoint,
  method,
  data,
}: FetchDataParams): AxiosPromise<T> => {

  return axios({
    url: endpoint,
    method,
    data,
  })
}

export default fetchData;