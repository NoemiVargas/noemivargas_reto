import React from "react";

function InfoCard() {
  return (
    <div>
      <div className="card" style={{borderRadius: '0rem'}}>
        <div className="card-body">
          <div className="">
            <div
              className="hover-overlay ripple"
              data-mdb-ripple-color="light"
              style={{marginBottom: '1rem'}}
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp"
                className="img-fluid"
                style={{borderRadius: '1rem', width: '100%', height: '12rem'}}
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
                src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp"
                alt="John Doe"
                className="me-3"
                style={{ width: 60, height: 40 }}
              />
              {/* Body */}
              <div style={{ lineHeight: "normal" }}>
                <span className="principal-title">United Kindom</span>
                <p className="continent-title">Europe</p>
              </div>
            </div>

            <div style={{ lineHeight: "85%" }}>
              <p>
                <label className="principal-title">Capital:&nbsp;</label>London
              </p>
              <p>
                <label className="principal-title">Language:&nbsp;</label>
                English
              </p>
              <p>
                <label className="principal-title">Population:&nbsp;</label>500k
                people
              </p>
              <p>
                <label className="principal-title">Currency:&nbsp;</label>Euro,
                Dollar
              </p>
              <p>
                <label className="principal-title">Region</label>
              </p>
            </div>
          </div>

          <div style={{boxShadow:'0px 0px 10px rgba(0,0,0,0.4)'}}>
            <ul style={{listStyle: 'none', padding: '0.8rem'}}>
              <li>Santa Cruz</li>
              <li>Cordoba</li>
              <li>jujuy</li>
              <li>Tucumán</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
