import React from "react";
import Select from "react-select";
import Button from "@mui/material/Button";

export const SelectCoin = ({ coins, currentCoin, setCurrentCoin, handleGo }) => {
    const [disabled, setDisabled] = React.useState(true);
    const coins_obj = Object.values(
        Object.keys(coins).reduce(function(acc, curr, i) {
            acc[i] = { name: curr, label: curr };
            return acc;
        }, {})
    );

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
                    options={coins_obj}
                    onChange={(option) => {
                        setDisabled(false);
                        setCurrentCoin(option.name);
                    }}
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
