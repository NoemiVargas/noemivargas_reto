import React from "react";
import "../../css/SideNav.css";

function SideNav() {
  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3"
        style={{ height: "100%", backgroundColor: "#676767" }}
      >
        <span
          style={{
            borderRadius: "6px",
            alignItems: "center",
            display: "flex",
            height: "50px",
            justifyContent: "center",
            background: "#DBDBDB",
            color: "#676767",
            fontWeight: "bold",
          }}
        >
          LogoReto
        </span>

        <ul className="nav flex-column mb-auto">
          <li>
            <a href="#" className="nav-link nav-item-normal">
              Home
            </a>
          </li>
          <li className="nav-pills">
            <a href="#" className="nav-link nav-item-selected">
              Vista 1
            </a>
          </li>
          <li>
            <a href="#" className="nav-link nav-item-normal">
              Vista 2
            </a>
          </li>
          <li>
            <a href="#" className="nav-link nav-item-normal">
              Vista 3
            </a>
          </li>
          <li>
            <a href="#" className="nav-link nav-item-normal">
              Lista 1
            </a>
          </li>
          <li>
            <a href="#" className="nav-link nav-item-normal">
              Lista 2
            </a>
          </li>
          <li>
            <a href="#" className="nav-link nav-item-normal">
              Lista 3
            </a>
          </li>
        </ul>

        <br></br>
      </div>
    </>
  );
}

export default SideNav;
