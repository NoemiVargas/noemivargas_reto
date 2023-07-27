import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { MDBCollapse } from "mdb-react-ui-kit";
import InfoCard from "./InfoCard";

const GET_COUNTRY = gql`
query findCountryByCode($codeToSearch: ID! ){
  country(code: $codeToSearch ){
    code,
    name,
    capital,
    continent {name},
    languages {name},
    currencies,
    states {name},
  }
}
`;


function ListCountry() {

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [showDetail, setShowDetail] = useState(false);

  const [country, setCountry] = useState(null);
  const [getCountry, result] = useLazyQuery(GET_COUNTRY);

  const showCountry = (code) => {
    getCountry({ variables: { codeToSearch: code } });
  };

  const onClickCountry = (code) => {
    showCountry(code);
    setShowDetail(!showDetail);
  };

  useEffect(() => {
    if (result.data) {
      setCountry(result.data.country);
    }
  }, [result]);

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
      {loading && <p>Cargando...</p>}
      {error && <p>Error : {error.message}</p>}
      {data &&
        (
          <div className="row g-0">
            <div className="col-sm" style={{ backgroundColor: "#E3F4FF", paddingLeft: '2rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', rowGap: '2rem' }}>
                {
                  data.countries.map(
                    ({ code, name, continent: { name: continentName } }, index) => (
                      <Card
                        key={index}
                        countryCode={code}
                        countryName={name}
                        continentName={continentName}
                        onClick={(e) => {
                          showCountry(code);
                          setShowDetail(!showDetail);
                        }}
                        selectedDetail={showDetail} />
                    )
                  )
                }


              </div>
            </div>
            {country && (
              <MDBCollapse className="col-4" show={showDetail} style={{ display: (showDetail) ? 'block' : 'none' }}>
                <InfoCard country={country}></InfoCard>
              </MDBCollapse>
            )}

          </div>
        )


      }
    </>
  );
}

export default ListCountry;
