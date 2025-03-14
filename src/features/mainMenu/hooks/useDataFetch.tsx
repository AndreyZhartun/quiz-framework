import { SupportedDataConfigs } from "../../../reducer/constants";
import { useEffect, useState } from "react";
import fetchData, { FetchDataParams } from "../utils/fetchData";

/**
 * Хук для получения данных по шаблону
 */
const useDataFetch = (config: SupportedDataConfigs) => {

  const {
    params,
    processResponse,
  } = dataFetchConfigs[config];

  const [data, setData] = useState<Record<string, string>[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true);

    fetchData(params)
      .then(({data}) => {
        setData(processResponse(data));
        setLoading(false);
      })  
      .catch((err: unknown) => {
        console.log(err);
        setError(String(err));
        setLoading(false);
      })
  }, [params, processResponse])

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
  params: FetchDataParams;
  processResponse: (response: any) => Record<string, string>[],
}

/**
 * Для каждого поддерживаемого источника можно указать параметры для запроса данных
 */
const dataFetchConfigs: Record<SupportedDataConfigs, FetchParams> = {
  [SupportedDataConfigs.Geography]: {
    params: {
      endpoint: "https://countries.trevorblades.com",
      method: 'POST',
      data: {
        query: '{ countries { code, name, capital, emoji } }'
      },
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