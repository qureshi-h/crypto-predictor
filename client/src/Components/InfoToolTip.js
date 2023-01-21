import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    width: "6vw",
                    textAlign: "center",
                },
            },
        },
    },
});

export const InfoToolTip = ({ info }) => {
    return (
        <ThemeProvider theme={theme}>
            <Tooltip
                title={info}
                sx={{
                    margin: 0,
                    padding: 0,
                    opacity: "25%",
                    "&:hover": { opacity: "75%" },
                }}
            >
                <IconButton>
                    <InfoIcon
                        sx={{
                            color: "white",
                            margin: "-0.5vh 0 0 0 ",
                            padding: 0,
                        }}
                    />
                </IconButton>
            </Tooltip>
        </ThemeProvider>
    );
};
