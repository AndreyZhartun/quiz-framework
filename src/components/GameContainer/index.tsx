import React from "react";
import { useQuery, gql } from '@apollo/client';
import Country from "../../features/quiz/models/Country";
import QuestionView from "../../features/quiz/components/QuestionView";
import generateQuestion from "../../features/quiz/utils/generateQuestion";

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

  const question = generateQuestion(data.countries);

  return <>
    <QuestionView
      question={question}
    />
  </>
}

export default GameContainer;