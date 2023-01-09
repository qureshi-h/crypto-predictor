import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const CustomCheckbox = ({ value, setChecked, label }) => {
    const checkBoxStyle = {
        color: "pink",
        "&.Mui-checked": {
            color: "hotpink",
        },
    };
    return (
        <FormControlLabel
            control={
                <Checkbox
                    sx={checkBoxStyle}
                    size="small"
                    checked={value}
                    onChange={(event) => setChecked(event.target.checked)}
                />
            }
            label={<span style={{ fontSize: "0.9rem" }}>{label}</span>}
            sx={{ color: "white" }}
        />
    );
};
