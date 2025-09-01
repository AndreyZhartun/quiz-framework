import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export type FetchDataParams = {
  endpoint: string;
} & Required<Pick<
  AxiosRequestConfig, 
  'method' | 'data'
>>

/**
 * axios wrapper
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