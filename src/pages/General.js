import React, { useState } from "react";
import SideNav from "./components/SideNav";
import Search from "./components/Search";
import InfoCard from "./components/InfoCard";
import ListCountry from "./components/ListCountry";
import { MDBCollapse } from "mdb-react-ui-kit";

function General() {

  return (
    <div>
      <div className="container-fluid g-0" style={{ height: '100vh' }}>
        <div className="row g-0">
          <div className="col-2" style={{ backgroundColor: "red" }}>
            <SideNav></SideNav>
          </div>
          <div className="col-10">
            <div className="row g-0" style={{ backgroundColor: "#E3F4FF", paddingTop: '1rem', paddingBottom: '2rem' }}>
              <Search></Search>

            </div>
            
            <ListCountry></ListCountry>
          </div>
        </div>
      </div>
    </div>
  );
}

export default General;
