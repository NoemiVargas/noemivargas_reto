import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Autocomplete, Box, CircularProgress, ImageListItem, ImageListItemBar, Paper, TextField } from "@mui/material";
import "../../css/Search.css";

const GET_LIST_COUNTRY_SELECT = gql`
query {
  countries {
    code,
    name,
    continent {code, name}
  }
}
`;

const GET_LIST_CONTINENT_SELECT = gql`
query {
  continents{
    code,
    name
  }
}
`;

const PaperComponentCustom = options => {
  const { containerProps, children } = options;

  return (
    <Paper

      sx={{
        marginTop: "1rem",
        borderRadius: '1.5rem',
        '& ul': {
          padding: '2%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }
      }}

      {...containerProps}>
      <div style={{ padding: '1rem' }}>
        <div className="d-flex justify-content-between">
          <label>Filtrar por continentes</label>

          <p><a href="#" onMouseDown={(event) => { event.preventDefault(); }}
            onClick={(e) => {}} class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Limpiar</a></p>

        </div>
        {children}
      </div>


    </Paper>
  );
};


function Search({ onChooseCountry, onChooseContinent }) {
  const { data, loading, error } = useQuery(GET_LIST_COUNTRY_SELECT);
  const { data: dataContinents, loading: loadingContinents, error: errorContinents } = useQuery(GET_LIST_CONTINENT_SELECT);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [countrySelected, setCountrySelected] = useState(null);

  useEffect(() => {
    if (loading == false) {
      setOptions(data.countries);
    }
  }, [loading]);



  return (
    <>
      <div
        className="buscaN d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#FFFFFF",
          padding: "10px 20px",
          borderRadius: "3rem",
          margin: "0 auto",
          width: "55%",
          flexWrap: 'wrap'
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
              options={options}
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
          onClick={(e) => {
            if (countrySelected) {
              onChooseCountry(countrySelected.code);
            }

          }}
        >
          <i className="fas fa-search" />
          &nbsp; Buscar
        </button>

        {dataContinents && (
          <Autocomplete
            multiple
            id="continent-select-demo"
            sx={{ width: '60%' }}
            size="small"
            options={dataContinents.continents}
            getOptionLabel={(option) => option.name}
            PaperComponent={PaperComponentCustom}
            onChange={(e, selected) => {
              onChooseContinent(selected.map(({ code }) => code));
            }}
            renderOption={(props, option) => (

              <Box component="span" sx={{
                width: '30%',
                height: '5rem',
                margin: '1.5%',
                textAlign: 'center'
              }} {...props}>

                <ImageListItem >
                  <img
                    src={`https://source.unsplash.com/random/?city&${option.code}`}
                    alt={option.name}
                    loading="lazy"
                    style={{ width: '60px', height: '40px' }}
                  />
                  <ImageListItemBar position="below" title={option.name} />
                </ImageListItem>
              </Box>




            )}

            renderInput={(params) => (

              <TextField
                {...params}
                label="Continente"
                variant="standard"
                placeholder="Seleccione"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
        )}



      </div>


    </>


  );
}

export default Search;
