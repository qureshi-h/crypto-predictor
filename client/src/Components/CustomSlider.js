import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

const Input = styled(MuiInput)`
    width: 42px;
`;

export default function CustomSlider({ value, setValue, label }) {
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === "" ? "" : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <Typography
                id="input-slider"
                gutterBottom
                style={{ fontSize: ".8rem" }}
            >
                {label}
            </Typography>
            <Grid container spacing={1} alignItems="center">
                <Grid item xs>
                    <div
                        style={{
                            // height: "3vh",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Slider
                            value={typeof value === "number" ? value : 0}
                            onChange={handleSliderChange}
                            aria-labelledby="input-slider"
                            size="small"
                            min={0}
                            max={1}
                            step={0.01}
                            sx={{ color: "aqua" }}
                        />
                    </div>
                </Grid>
                <Grid item>
                    <div
                        style={{
                            // height: "3vh",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Input
                            value={value}
                            size="small"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            disableUnderline
                            inputProps={{
                                step: 0.005,
                                min: 0,
                                max: 1,
                                type: "number",
                                "aria-labelledby": "input-slider",
                            }}
                            sx={{
                                marginLeft: "5vh",
                                width: "5vw",
                                color: "white",
                                fontSize: "0.8rem",
                            }}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
