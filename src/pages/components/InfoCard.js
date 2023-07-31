import React, { useEffect, useState } from "react";
import "../../css/InfoCard.css";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { MDBBtn } from "mdb-react-ui-kit";

const GET_COUNTRY = gql`
query findCountryByCode($codeToSearch: ID! ){
  country(code: $codeToSearch ){
    name,
    capital,
    continent {name},
    languages {name},
    currencies,
    states {name},
  }
}
`;

function InfoCard({ country }) {
  const listLanguage = country.languages.map((item, index) => { return item.name });

  return (
    <>
      <div className="card InfoBody" style={{ borderRadius: '0rem' }}>
        <div className="card-body">
          <div className="">
            <div
              className="hover-overlay ripple"
              data-mdb-ripple-color="light"
              style={{ marginBottom: '1rem' }}
            >
              <img
                src={`https://source.unsplash.com/random/?city&${"es".toLowerCase()}`}
                className="img-fluid"
                style={{ borderRadius: '1rem', width: '100%', height: '12rem' }}
              />

              <a href="#!">
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                />
              </a>
            </div>

            <div
              className="d-flex align-items-center"
              style={{ marginBottom: "0.8rem" }}
            >
              {/* Image */}
              <img
                src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                className="me-3"
                style={{ width: 60, height: 40 }}
              />
              {/* Body */}
              <div style={{ lineHeight: "normal" }}>
                <span className="principal-title">{country.name}</span>
                <p className="continent-title">{country.continent.name}</p>
              </div>
            </div>

            <div style={{ lineHeight: "85%" }}>
              <p>
                <label className="principal-title">Capital:&nbsp;</label>{country.capital}
              </p>
              <p>
                <label className="principal-title">Language:&nbsp;</label>
                {listLanguage.join(', ')}
              </p>
              {/* <p>
                <label className="principal-title">Population:&nbsp;</label>500k
                people
              </p> */}
              <p>
                <label className="principal-title">Currency:&nbsp;</label>Euro,
                Dollar
              </p>
              {country.states.length > 0 && <p>
                <label className="principal-title">Region</label>
              </p>}
            </div>
          </div>

          {country.states.length > 0 && (
            <div className="boxInfo" style={{ boxShadow: '0px 0px 10px rgba(0,0,0,0.4)' }}>
              <ul style={{ listStyle: 'none', padding: '0.8rem' }}>

                {
                  country.states.map(
                    ({ name }, index) => (
                      <li key={index}>{name}</li>


                    )
                  )
                }

              </ul>
            </div>
          )}


        </div>

      </div>
    </>
  );
}

export default InfoCard;
