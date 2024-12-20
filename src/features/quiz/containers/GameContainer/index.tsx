import React from "react";
import { useQuery, gql } from '@apollo/client';
import Country from "../../models/Country";
import Game from "../../components/Game";

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      capital
      emoji
    }
  }
`;

type CountriesQueryResult = {
  countries: Country[];
}

const GameContainer: React.FC = () => {

  const {
    data,
    loading,
    error,
  } = useQuery<CountriesQueryResult>(GET_COUNTRIES);
  
  if (loading) { 
    return <p>Загрузка...</p>
  }

  if (error) { 
    return <p>Ошибка: {error.message}</p>
  }

  if (!data) {
    return <p>
      Нет данных
    </p>
  }

  return <>
    <Game countries={data.countries}/>
  </>
}

export default GameContainer;