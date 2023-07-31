import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Box, Button, ImageListItem, ImageListItemBar, Popover, TextField, Typography, stepConnectorClasses } from "@mui/material";
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import "../../css/SearchPais.css"


const GET_LIST_CONTINENT_SELECT = gql`
query {
  continents{
    code,
    name
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


const messagePais = "Pais no encontrado";

function SearchPais({ listaPaises, onSetPaises }) {

    const [countryName, setCountryName] = useState("")
    const [messageError, setMessageError] = useState("")
    const [countryNameError, setCountryNameError] = useState(false);

    const findCountry = (event) => {
        event.preventDefault();
        setMessageError("");

        if (countryName == "") {
            setMessageError(messagePais);
            setCountryNameError(true);
            return;
        }

        const listresult = listaPaises.filter((pais) => {
            return pais.name.toLowerCase().includes(countryName.toLowerCase());

        });

        //verificar resultado
        if (listresult.length == 0) {
            setMessageError(messagePais);
            setCountryNameError(true);
        }
        else {
            onSetPaises(listresult);
            setCountryNameError(false);
        }
    }

    //Para mostrar gui de continentes
    const { data: dataContinents, loading: loadingContinents, error: errorContinents } = useQuery(GET_LIST_CONTINENT_SELECT);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setContinents([]);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [continents, setContinents] = useState([]);

    const removeSeletedContinent = (code) => {
        return continents.filter((continent) => {
            let resultado = continent != code;
            return resultado;
        });
    };

    const [getCountriesByContinent, resultCountriesByContinent] = useLazyQuery(GET_COUNTRIES_BY_CONTINEN);

    const selectecContinent = (e) => {
        e.preventDefault();
        let codigo = e.currentTarget.getAttribute('data-country-code');

        if (e.currentTarget.classList.contains("itemContinent-active")) {
            //remover
            e.currentTarget.classList.remove("itemContinent-active");
            const temp = removeSeletedContinent(codigo);
            if (typeof temp !== "undefined") {
                getCountriesByContinent({ variables: { continentToSearch: temp } });
            }
            setContinents(typeof temp === "undefined" ? [] : temp);
        }
        else {
            //agregar
            e.currentTarget.classList.add("itemContinent-active");
            const tempL = [...continents, codigo];
            setContinents(tempL);
            getCountriesByContinent({ variables: { continentToSearch: tempL } });
        }
    };


    useEffect(() => {

        if (resultCountriesByContinent.called && resultCountriesByContinent.data) {
            onSetPaises(resultCountriesByContinent.data.countries);
            resultCountriesByContinent.called = false;
        }


    }, [resultCountriesByContinent]);

    const cleanFilter = (e) => {
        setContinents([]);
        onSetPaises([]);
        const itemsDiv = document.querySelectorAll("span.itemContinent-active");
        itemsDiv.forEach((item) => {
            item.classList.remove("itemContinent-active");
        });
    };



    return (
        <>
            <div
                className="buscaN d-flex justify-content-center align-items-center"
                style={{
                    backgroundColor: "#FFFFFF",

                    padding: "10px 20px",
                    borderRadius: "3rem",
                    margin: "0 auto",
                    width: "70%",
                    flexWrap: 'wrap'
                }}
            >



                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        width: '97%'
                    }}
                    className="d-flex justify-content-between"
                    onSubmit={findCountry}
                >
                    <TextField id="standard-basic"
                        required
                        label="País"
                        variant="standard"
                        placeholder="Escribe el país que desea ver"
                        value={countryName}
                        onChange={e => {
                            setCountryName(e.target.value.trim())
                        }}
                        error={countryNameError}
                        helperText={messageError}
                        onClick={handleClick}
                    />
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            backgroundColor: "#009CFF",
                            borderRadius: "3rem",
                            color: "white",
                            textTransform: 'capitalize'
                        }}
                    >
                        <i className="fas fa-search" />
                        &nbsp; Buscar
                    </button>

                    <Popover
                        id="listaContinentes"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        sx={{
                            "& .MuiPaper-root": {
                                width: "500px",
                                borderRadius: '25px',
                                padding: '1rem'
                            }
                        }}
                    >

                        <div className="d-flex justify-content-between">
                            <label>Filtrar por continentes</label>

                            <p>
                                <a href="#"
                                    onClick={cleanFilter}
                                    className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Limpiar</a></p>
                        </div>

                        {dataContinents && (
                            <ul style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap'
                            }}>
                                {dataContinents.continents.map((continent, index) => (
                                    <Box component="span" key={index}
                                        sx={{
                                            width: '30%',
                                            height: '5rem',
                                            margin: '1.5%',
                                            textAlign: 'center'
                                        }}
                                        onClick={selectecContinent}
                                        data-country-code={continent.code}

                                    >

                                        <ImageListItem data-country-code={continent.code}
                                        >
                                            <img
                                                src={`https://source.unsplash.com/random/?city&${continent.name}`}
                                                alt={""}
                                                loading="lazy"
                                                style={{ height: '60px',
                                            borderRadius: '0.4rem' }}
                                            />
                                            <ImageListItemBar position="below" title={continent.name} />
                                        </ImageListItem>
                                    </Box>
                                ))}
                            </ul>

                        )}


                    </Popover>
                </Box>

                <div
                    className="input-group"
                    style={{ backgroundColor: "white" }}
                >
                    <div className="form-outline">
                    </div>
                </div>
            </div>
        </>


    );
}

export default SearchPais;