import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { ThemeProvider, createTheme } from "@mui/material";

const marks = [
    {
        value: 0,
        label: "One Minute",
    },
    {
        value: 1,
        label: "Five Minutes",
    },
    {
        value: 2,
        label: "Fifteen Minutes",
    },
    {
        value: 3,
        label: "One Hour",
    },
    {
        value: 4,
        label: "Six Hours",
    },
    {
        value: 5,
        label: "One Day",
    },
];

const theme = createTheme({
    components: {
        MuiSlider: {
            styleOverrides: {
                markLabel: {
                    color: "white",
                },
                mark: {
                    height: "2vh",
                    width: "0.3vw",
                    borderRadius: "2rem",
                    color: "white",
                },
                thumb: {
                    color: "white",
                },
            },
        },
    },
});

function valuetext(value) {
    return `${value}`;
}

export default function DiscreteSliderMarks({ setGranularity, handleDone }) {
    return (
        <div style={{ marginTop: "15vh" }}>
            <ThemeProvider theme={theme}>
                <Box sx={{ width: "50vw" }}>
                    <Slider
                        aria-label="Custom marks"
                        defaultValue={3}
                        getAriaValueText={valuetext}
                        step={1}
                        valueLabelDisplay="off"
                        marks={marks}
                        max={5}
                        onChange={(value) => setGranularity(value.target.value)}
                        onChangeCommitted={handleDone}
                    />
                </Box>
            </ThemeProvider>

            <h3 className="granluarityText">
                Select A Granularity Level For the Analysis
            </h3>
        </div>
    );
}
