import React from "react";
import Card from "./Card";
import { useQuery, gql } from "@apollo/client";

function ListCountry() {
  const GET_LIST_COUNTRY = gql`
    query {
      countries {
        code
        name
        continent {
          name
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_LIST_COUNTRY);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {data &&
        data.countries.map(
          ({ code, name, continent: { name: continentName } }, index) => (
            <Card 
            key={index} 
            countryCode={code}
            countryName={name} 
            continentName={continentName} />
          )
        )}
    </>
  );
}

export default ListCountry;
