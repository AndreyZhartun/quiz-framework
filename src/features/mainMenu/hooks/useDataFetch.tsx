import { SupportedDataConfigs } from "../../../reducer/constants";
import { useEffect, useState } from "react";

/**
 * Хук для получения данных по шаблону
 */
const useDataFetch = (config: SupportedDataConfigs) => {

  const {
    endpoint,
    params,
    processResponse,
  } = dataFetchConfigs[config];

  const [data, setData] = useState<Record<string, string>[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)

    fetch(endpoint, params)
      .then(res => res.json())
      .then(res => {
        setData(processResponse(res));
        setLoading(false);
      })  
      .catch((err: unknown) => {
        console.log(err);
        setError(String(err));
        setLoading(false);
      })
  }, [endpoint, params, processResponse])

  return {
    data,
    loading,
    error,
  }
}

/**
 * Параметры для получения данных
 */
type FetchParams = {
  endpoint: string;
  params: RequestInit;
  processResponse: (response: any) => Record<string, string>[],
}

/**
 * Для каждого поддерживаемого источника можно указать параметры для запроса данных
 */
const dataFetchConfigs: Record<SupportedDataConfigs, FetchParams> = {
  [SupportedDataConfigs.Geography]: {
    endpoint: "https://countries.trevorblades.com",
    params: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ countries { code, name, capital, emoji } }' }),
    },
    processResponse: response => {

      if (!response?.data?.countries) {
        return [];
      }

      return response.data.countries as Record<string, string>[];
    },
  }
}

export default useDataFetch;