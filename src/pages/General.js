import React, { useEffect, useState } from "react";
import SideNav from "./components/SideNav";
import Search from "./components/Search";
import InfoCard from "./components/InfoCard";
import ListCountry from "./components/ListCountry";
import { MDBCollapse } from "mdb-react-ui-kit";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const GET_COUNTRY = gql`
query findCountryByCode($codeToSearch: ID! ){
  country(code: $codeToSearch ){
    code
    name
    continent {
      name
    }
  }
}
`;


const GET_COUNTRIES_BY_CONTINEN = gql`
query findCountryByContinent($continentToSearch:  [String!] ){
  countries(filter: {continent: {in: $continentToSearch}}) {
    code,
    name,
    continent {
      name
    }
  }
}
`;

function General() {
  
  const [isSingle, setIsSingle] = useState('');
  const [getCountry, resultCountry] = useLazyQuery(GET_COUNTRY);
  const [getCountriesByContinent, resultCountriesByContinent] = useLazyQuery(GET_COUNTRIES_BY_CONTINEN);

  const [countryCode, setCountryCode] = useState(null);
  const [countries, setCountries] = useState([]);
  const chooseCountry = (code) => {
    setIsSingle("SI");
    console.log("chooseCountry:", code);
    setCountryCode(code);
    getCountry({ variables: { codeToSearch: code } });
  };

  const chooseContinent = (codes) => {
    setIsSingle("NO");
    console.log("chooseContinent:", codes);
    getCountriesByContinent({ variables: { continentToSearch: codes } });
  };

  useEffect(() => {
    if (isSingle == "SI") {
      if (resultCountry.called && resultCountry.data) {
        setCountries([resultCountry.data.country]);
        resultCountry.called = false;
      }
    } else if (isSingle == "NO") {
      if (resultCountriesByContinent.called && resultCountriesByContinent.data) {
        setCountries(resultCountriesByContinent.data.countries);
        resultCountriesByContinent.called = false;
      }
    }

  }, [resultCountry, resultCountriesByContinent]);


  return (
    <div>
      <div className="container-fluid g-0" style={{ height: '100vh' }}>
        <div className="row g-0">
          <div className="col-2" style={{ backgroundColor: "red" }}>
            <SideNav></SideNav>
          </div>
          <div className="col-10">
            <div className="row g-0" style={{ backgroundColor: "#E3F4FF", paddingTop: '1rem', paddingBottom: '2rem' }}>
              <Search
                onChooseCountry={chooseCountry}
                onChooseContinent={chooseContinent}
              ></Search>

            </div>

            <ListCountry
              countryList={countries}
            ></ListCountry>
          </div>
        </div>
      </div>
    </div>
  );
}

export default General;
