import { gql, useLazyQuery } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

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

const messagePais = "Pais no encontrado";

function SearchPais({ listaPaises, onSetPaises}) {

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
                        onChange={e => setCountryName(e.target.value)}
                        error={countryNameError}
                        helperText={messageError}
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