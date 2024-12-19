import React from "react";
import { useQuery, gql } from '@apollo/client';

const GET_COUNTRY_CODES = gql`
  query {
    countries {
      code
    }
  }
`;

type Country = {
  code: string;
}

type CountryCodesQueryResult = {
  countries: Country[];
}

const DisplayCountries: React.FC = () => {

    const { loading, error, data } = useQuery<CountryCodesQueryResult>(GET_COUNTRY_CODES);


  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  if (!data) {
    return <p>
      No Data
    </p>
  }

  return data.countries.map(({code}) => (
    <div key={code}>
      <h3>{code}</h3>
    </div>
  ));
}

export default DisplayCountries;