import React from "react";
import "../../css/Card.css";

function Card({ onClick, countryCode, countryName, continentName, selectedDetail }) {
  return (
    <div className="eachCard" style={{ width: selectedDetail ? '45%':'30%' }} onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}>
      <div
        className="card"
        style={{
          borderRadius: "1.2rem",
          boxShadow: "-1px -3px 9px rgba(0,0,0,0.8)",
        }}
      >
        <div className="hover-overlay ripple" data-mdb-ripple-color="light">
          <img
            src={`https://source.unsplash.com/random/?city&${countryCode.toLowerCase()}`}
            className="img-fluid"
            style={{
              width: "100%",
              height: "110px",
              borderTopLeftRadius: "1.2rem",
              borderTopRightRadius: "1.2rem",
            }}
          />
          <a href="#!">
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            />
          </a>
        </div>
        <div style={{ padding: "0.6rem" }}>
          <div className="d-flex align-items-center">
            <div className="bandera">
              <img
                src={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`}
                alt={countryName}
                className="me-3"
                width={80}
              />
            </div>

            <div style={{ lineHeight: "normal" }}>
              <span className="principal-title">{countryName}</span>
              <p className="continent-title">{continentName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
