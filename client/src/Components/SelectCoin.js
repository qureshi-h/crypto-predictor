import React from "react";
import Select from "react-select";
import coins from "../res/coins.json";
import Button from "@mui/material/Button";

export const SelectCoin = ({ currentCoin, setCurrentCoin, handleGo }) => {
    const [disabled, setDisabled] = React.useState(false);

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            height: "7vh",
            borderRadius: "1.2rem",
        }),

        input: (provided, state) => ({
            ...provided,
            // marginLeft: "1.5rem",
        }),

        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? "#2584FF" : "white",
                color: "#000000",
                fontSize: "0.9rem",
                fontFamily: "Montserrat",

                cursor: isDisabled ? "not-allowed" : "default",
            };
        },
    };

    return (
        <div style={{ display: "block" }}>
            <h1 style={{ color: "white" }}>Crypto Analyser</h1>

            <div className="selectCoin">
                <Select
                    className="selectBox"
                    options={coins.data}
                    onChange={(option) => setCurrentCoin(option.name)}
                    styles={colourStyles}
                    placeholder={currentCoin}
                />

                <Button
                    disabled={disabled}
                    variant="contained"
                    className="selectCoinButton"
                    sx={{
                        marginLeft: "1.5vw",
                        borderRadius: "1.2rem",
                        fontSize: "0.9rem",
                        backgroundColor: "orange",
                        color: "black",
                        fontFamily: "Sans-Serif",
                        padding: "0 2rem 0 2 rem",
                        "&:hover": {
                            color: "black",
                            backgroundColor: "darkorange",
                        },
                        "&.Mui-disabled": {
                            background: "grey",
                            color: "black",
                        },
                    }}
                    onClick={() => {
                        setDisabled(true);
                        handleGo();
                    }}
                >
                    Go
                </Button>
            </div>
        </div>
    );
};
