import { Card, Collapse } from "@mui/material";
import { MDBBtn, MDBCollapse, MDBIcon } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import CardPais from "./components/CardPais";
import InfoCard from "./components/InfoCard";
import Search from "./components/Search";
import "../css/Paises.css"
import SearchPais from "./components/SearchPais";

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

function Paises() {
    const [isActiveDetail, setisActiveDetail] = useState(false);

    const showDetail = () => {
        setisActiveDetail(!isActiveDetail);
    };


    //Para buscar pais al presionar un card
    const [getCountry,
        { called: calledGetCountry, loading: loadingGetCountry, data: dataCountry }] = useLazyQuery(GET_COUNTRY);
    const showCountry = (code) => {
        getCountry({ variables: { codeToSearch: code } });
        console.log("showCountry", code)
    };

    // Para listado de paises de la barra de busqueda
    const [countries, setCountries] = useState([]);
    const renderListCountries = (lista) => {
        setisActiveDetail(false);
        setCountries(lista);
        
    };

    //Para listar todos los paises
    const { data, loading, error } = useQuery(GET_LIST_COUNTRY);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        console.log("countries: ", countries)
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [countries]);

    return (
        <>
            <div className="search-bar row"
                style={{
                    backgroundColor: '#E3F4FF',
                    paddingTop: '1rem',
                    paddingBottom: '2rem'
                }}>
                {(data) && (
                    <SearchPais listaPaises={data.countries} onSetPaises={renderListCountries}></SearchPais>
                )}

            </div>

            {loading && <p>Cargando...</p>}

            {(data && countries.length == 0) &&
                (
                    <div className="row">
                        <div className={"d-sm-flex flex-sm-column d-md-flex flex-md-row flex-md-wrap justify-content-md-around " + ((isActiveDetail) ? "col-md-9" : "col-md-12")}
                            style={{ backgroundColor: '#E3F4FF', rowGap: '1rem' }}>
                            {
                                data.countries.map(
                                    ({ code, name, continent: { name: continentName } }, index) => (
                                        <CardPais
                                            key={index}
                                            countryCode={code}
                                            countryName={name}
                                            continentName={continentName}
                                            onClick={(e) => {
                                                showCountry(code);
                                                setisActiveDetail(true);

                                            }}
                                            selectedDetail={showDetail} />
                                    )
                                )
                            }

                        </div>

                        {dataCountry && (
                            <MDBCollapse id="collapseDetalle" show={isActiveDetail} className={"p-0 col-sm-12 col-md-3 " + (windowWidth < 768 && "position-fixed top-50")} style={{ backgroundColor: 'white' }}>
                                <MDBBtn size='lg' floating style={{ backgroundColor: '#0082ca' }} onClick={(e) => { setisActiveDetail(false) }}>
                                    <MDBIcon fas icon="times" />
                                </MDBBtn>
                                <InfoCard country={dataCountry.country}></InfoCard>
                            </MDBCollapse>
                        )}



                    </div>

                )
            }

            {(countries.length > 0) &&
                (
                    <div className="row">
                        <div className={"d-sm-flex flex-sm-column d-md-flex flex-md-row flex-md-wrap justify-content-md-around " + ((isActiveDetail) ? "col-md-9" : "col-md-12")}
                            style={{ backgroundColor: '#E3F4FF', rowGap: '1rem', minHeight: '100vh' }}>
                            {
                                countries.map(
                                    ({ code, name, continent: { name: continentName } }, index) => (
                                        <CardPais
                                            key={index}
                                            countryCode={code}
                                            countryName={name}
                                            continentName={continentName}
                                            onClick={(e) => {
                                                showCountry(code);
                                                setisActiveDetail(true);

                                            }}
                                            selectedDetail={showDetail} />
                                    )
                                )
                            }



                        </div>

                        {dataCountry && (


                            <MDBCollapse id="collapseDetalle" show={isActiveDetail} className={"p-0 col-sm-12 col-md-3 " + (windowWidth < 768 && "position-fixed top-50")} style={{ backgroundColor: 'white' }}>


                                <MDBBtn size='lg' floating style={{ backgroundColor: '#0082ca' }} onClick={(e) => { setisActiveDetail(false) }}>
                                    <MDBIcon fas icon="times" />
                                </MDBBtn>

                                <InfoCard country={dataCountry.country}></InfoCard>

                            </MDBCollapse>
                        )}



                    </div>

                )
            }

        </>
    );
}

export default Paises;