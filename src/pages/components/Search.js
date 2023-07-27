import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

const GET_LIST_COUNTRY_SELECT = gql`
query {
  countries {
    code,
    name,
    continent {code, name}
  }
}
`;

function Search({onChooseCountry}) {
  const { data, loading, error } = useQuery(GET_LIST_COUNTRY_SELECT);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [countrySelected, setCountrySelected] = useState(null);

  useEffect(()=>{
    if(loading == false)
    {
      setOptions(data.countries);
    }
  },[loading]);



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

          <Autocomplete
            id="asynchronous-demo"
            autoSelect
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            getOptionLabel={(option) => option.name}
            options={ options }
            loading={loading}
            onChange={(e, selected) => {
              setCountrySelected(selected);
            }}
            value={countrySelected}

            renderInput={(params) => (
              <TextField
                {...params}
                label="País"
                variant="standard"
                placeholder="Escribe el país que desea ver"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}

          />

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
        onClick={(e) =>{
          if(countrySelected){
            onChooseCountry(countrySelected.code);
          }
          
        }}
      >
        <i className="fas fa-search" />
        &nbsp; Buscar
      </button>

    </div>
  );
}

export default Search;
