import React from "react";

function Search() {

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "10px 20px",
        borderRadius: "3rem",
        margin: "0 auto",
        width: "55%",
      }}
    >
     
      <div
        className="input-group"
        style={{ width: "60%", backgroundColor: "white" }}
      >
        <div className="form-outline">
          <input type="search" id="form1" className="form-control" />
          <label className="form-label" htmlFor="form1">
            Search
          </label>
        </div>
      </div>
      <button
        type="button"
        className="btn"
        style={{
          backgroundColor: "#009CFF",
          borderRadius: "3rem",
          color: "white",
        }}
      >
        <i className="fas fa-search" />
        &nbsp; Buscar
      </button>
    </div>
  );
}

export default Search;
