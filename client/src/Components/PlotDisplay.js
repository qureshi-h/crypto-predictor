import React from "react";
import FormGroup from "@mui/material/FormGroup";
import { CustomCheckbox } from "./CustomCheckbox";
import CustomSlider from "./CustomSlider";
import Button from "@mui/material/Button";

export const PlotDisplay = ({
    plots,
    thresholdX,
    setThresholdX,
    thresholdY,
    setThresholdY,
    handleReRun
}) => {
    const [levels, setLevels] = React.useState(true);
    const [trendline, setTrendline] = React.useState(true);
    const [optimised, setOptimised] = React.useState(true);

    return (
        <div className="analysisTable">
            <div
                style={{
                    display: "inline-flex",
                    borderLeft: "0.3rem solid aqua",
                }}
            >
                <div
                    style={{
                        display: "inline-flex",
                        padding: "0 3rem 0 3rem",
                    }}
                >
                    <div className="analysisInfo">
                        <h4
                            style={{
                                fontSize: "1.2rem",
                                color: "white",
                                padding: "1rem",
                                textAlign: "center",
                            }}
                        >
                            Support / Resistance Plots
                        </h4>

                        <div style={{ marginLeft: "1vw" }}>
                            <FormGroup sx={{ marginTop: "1vh" }}>
                                <CustomCheckbox
                                    value={levels}
                                    setChecked={setLevels}
                                    label="Show Levels"
                                />
                                <CustomCheckbox
                                    value={trendline}
                                    setChecked={setTrendline}
                                    label="Show Trendline"
                                />
                                <CustomCheckbox
                                    value={optimised}
                                    setChecked={setOptimised}
                                    label="Optimise"
                                />
                                <div style={{ marginTop: "3vh" }}>
                                    <CustomSlider
                                        {...{
                                            value: thresholdX,
                                            setValue: setThresholdX,
                                            label: "Resistance Sensitivity",
                                        }}
                                    />
                                    <CustomSlider
                                        {...{
                                            value: thresholdY,
                                            setValue: setThresholdY,
                                            label: "Support Sensitivity",
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "1vh",
                                    }}
                                >
                                    <Button
                                        sx={{
                                            backgroundColor: "orange",
                                            marginTop: "1vh",
                                            textAlign: "center",
                                        }}
                                        variant="contained"
                                        size={"small"}
                                        style={{ marginRight: 0 }}
                                        onClick={handleReRun}
                                    >
                                        Re-Run
                                    </Button>
                                </div>
                            </FormGroup>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "30vw",
                            backgroundColor: "rgb(10, 4, 30)",
                            boxShadow: "0px 4px 10px #707070",
                            borderRadius: "0rem 1rem 1rem 0rem",
                            padding: "1rem",
                        }}
                    >
                        <img
                            src={
                                `http://localhost:5001/${plots[
                                    (trendline ? 2 : levels) +
                                        (optimised ? 3 : 0)
                                ]}.png`
                            }
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
