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

function General() {

  const [countryCode, setCountryCode] = useState(null);
  const [countries, setCountries] = useState([]);
  const chooseCountry = (code) => {
    setCountryCode(code);
    getCountry({ variables: { codeToSearch: code } });
  };

  const [continentCode, setContinentCode] = useState(null);
  const chooseContinent = (code) => {
    setContinentCode(code);
  };

  const [getCountry, {called: calledGetCountry, loading: loadingGetCountry, data: dataGetCountry}] = useLazyQuery(GET_COUNTRY);


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
              ></Search>

            </div>

            <ListCountry
            countryList={(dataGetCountry) ? [dataGetCountry.country]:[]}
            ></ListCountry>
          </div>
        </div>
      </div>
    </div>
  );
}

export default General;
