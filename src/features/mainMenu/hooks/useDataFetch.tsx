import Country from "../../quiz/models/Country";
import { SupportedDataConfigs } from "../components/MainMenu/DataLoadMenu/types";
import { useEffect, useState } from "react";

/**
 * Хук для получения данных по шаблону
 */
const useDataFetch = (config: SupportedDataConfigs) => {

  const {
    endpoint,
    params,
    processResponse: responseProcessor,
  } = dataFetchConfigs[config];

  const [data, setData] = useState<Country[]>([])

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(endpoint, params)
      .then(res => res.json())
      .then(res => {
        setData(responseProcessor(res));
      })  
      .catch(err => {
        console.log(err);
        setError(err);
      })
  }, [])

  return {
    data,
    loading: false,
    error,
  }
}

type FetchParams = {
  endpoint: string;
  params: RequestInit;
  processResponse: (response: any) => Country[],
}

const dataFetchConfigs: Record<SupportedDataConfigs, FetchParams> = {
  [SupportedDataConfigs.Geography]: {
    endpoint: "https://countries.trevorblades.com",
    params: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ countries { code, name, capital, emoji } }' }),
    },
    processResponse: response => response.data.countries,
  }
}

export default useDataFetch;