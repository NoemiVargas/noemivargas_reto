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


function ListCountry({ countryList }) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [showDetail, setShowDetail] = useState(false);

  const [country, setCountry] = useState(null);

  //Para buscar pais
  const [getCountry, 
    { called: calledGetCountry, loading: loadingGetCountry, data: dataCountry }] = useLazyQuery(GET_COUNTRY);
  const showCountry = (code) => {
    getCountry({ variables: { codeToSearch: code } });
    console.log("showCountry", code)
  };

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
      {(data && countryList.length == 0) &&
        (
          <div className="row g-0" style={{ height: '80vh' }}>
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
            {dataCountry && (
              <MDBCollapse className="col-4" show={showDetail} style={{ display: (showDetail) ? 'block' : 'none' }}>
                <InfoCard country={dataCountry.country}></InfoCard>
              </MDBCollapse>
            )}

          </div>
        )
      }

      {(countryList.length > 0) &&
        (
          <div className="row g-0" style={{ height: '80vh' }}>
            <div className="col-sm" style={{ backgroundColor: "#E3F4FF", paddingLeft: '2rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', rowGap: '2rem' }}>
                {
                  countryList.map(
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
            {dataCountry && (
              <MDBCollapse className="col-4" show={showDetail} style={{ display: (showDetail) ? 'block' : 'none' }}>
                <InfoCard country={dataCountry.country}></InfoCard>
              </MDBCollapse>
            )}

          </div>
        )


      } 
    </>
  );
}

export default ListCountry;
