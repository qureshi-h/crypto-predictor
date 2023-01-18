import React from "react";
import FormGroup from "@mui/material/FormGroup";
import { CustomCheckbox } from "./CustomCheckbox";
import CustomSlider from "./CustomSlider";
import Button from "@mui/material/Button";
import { LoadingScreen } from "./LoadingScreen";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

export const PlotDisplay = ({
    plots,
    thresholdX,
    setThresholdX,
    thresholdY,
    setThresholdY,
    handleReRun,
    loadingPlot,
}) => {
    const [levels, setLevels] = React.useState(true);
    const [trendline, setTrendline] = React.useState(true);
    const [optimised, setOptimised] = React.useState(false);
    const [currentVersion, setcurrentVersion] = React.useState(0);

    const handleRedo = () => {
        if (currentVersion < plots.length - 1)
            setcurrentVersion(currentVersion + 1);
    };
    const handleUndo = () => {
        if (currentVersion > 0) setcurrentVersion(currentVersion - 1);
    };
    return (
        <div
            className="analysisTable"
            style={{
                filter: loadingPlot ? "brightness(50%)" : "brightness(100%)",
            }}
        >
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
                                            backgroundColor: "#f05016",
                                            marginTop: "1vh",
                                            textAlign: "center",
                                            "&:hover": {
                                                backgroundColor: "brown",
                                            },
                                            "&:disabled": {
                                                backgroundColor: "grey",
                                            },
                                        }}
                                        variant="contained"
                                        size={"small"}
                                        style={{ marginRight: 0 }}
                                        onClick={() => {
                                            handleReRun(setcurrentVersion);
                                            setOptimised(false);
                                        }}
                                        disabled={loadingPlot}
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
                            src={`http://localhost:5001/${
                                plots[currentVersion][
                                    (levels ? 1 : 0) +
                                        (trendline ? 2 : 0) +
                                        (optimised ? 4 : 0)
                                ]
                            }`}
                            alt="Something Went Wrong!"
                            style={{
                                width: "30vw",
                                margin: 0,
                                display: "block",
                            }}
                        />

                        <div className="undo">
                            <UndoIcon
                                className={`switch ${
                                    currentVersion === 0
                                        ? "iconDisabled"
                                        : "icon"
                                }`}
                                onClick={handleUndo}
                            />
                            <RedoIcon
                                className={`switch ${
                                    currentVersion === plots.length - 1
                                        ? "iconDisabled"
                                        : "icon"
                                }`}
                                onClick={handleRedo}
                            />
                        </div>

                        {loadingPlot && (
                            <div
                                style={{
                                    position: "absolute",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    zIndex: 10,
                                    top: 0,
                                    width: "30vw",
                                }}
                            >
                                <LoadingScreen />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
