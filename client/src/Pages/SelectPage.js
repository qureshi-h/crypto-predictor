import React from "react";
import { SelectCoin } from "../Components/SelectCoin";
import GranularitySelector from "../Components/GranularitySelector";
import { DatePickerStart } from "../Components/DatePickerStart";
import { DatePickerEnd } from "../Components/DatePickerEnd";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AnimatePresence, motion as m } from "framer-motion/dist/framer-motion";

export const SelectPage = () => {
    const [state, setState] = React.useState(1);
    const [granularity, setGranularity] = React.useState(1);
    const [currentCoin, setCurrentCoin] = React.useState(
        "Select A Coin To Begin"
    );
    const [selectedStart, setSelectedStart] = React.useState(null);
    const [selectedEnd, setSelectedEnd] = React.useState(null);

    const handleGo = () => {
        setState(1);
    };

    const handleBack = () => {
        setState(state - 1);
    };

    const handleDone = () => {
        setState(state + 1);
    };

    const handleStart = (date) => {
        setSelectedStart(date);
        setState(state + 1);
    };

    const handleEnd = (date) => {
        setSelectedEnd(date);
        // setState(state + 1);
    };

    return (
        <div className="selectPage">
            <div className="background"></div>

            {state === 0 ? (
                <m.div
                    key="selectCoin"
                    className="selectPage"
                    initial={{ y: "-27vh" }}
                    animate={{ y: "0vh" }}
                    transition={{ ease: "easeIn", duration: 0.5 }}
                    exit={{ opacity: 1 }}
                >
                    <SelectCoin
                        {...{ currentCoin, setCurrentCoin, handleGo }}
                    />
                </m.div>
            ) : (
                <>
                    <m.div
                        className="selectGranularity"
                        key="background1"
                        initial={{ y: "27vh" }}
                        animate={{ y: "0vh" }}
                        transition={{ ease: "easeIn", duration: 0.5 }}
                    >
                        <SelectCoin
                            {...{ currentCoin, setCurrentCoin, handleGo }}
                        />
                    </m.div>

                    <AnimatePresence>
                        <m.div
                            className="overlay"
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: "easeIn", duration: 1 }}
                            // exit={{
                            //     x: "100vw",
                            //     transition: {
                            //         ease: "easeIn",
                            //         duration: 10,
                            //         zIndex: 1000,
                            //     },
                            // }}
                        ></m.div>
                    </AnimatePresence>

                    <m.div
                        style={{
                            position: "absolute",
                            display: "flex",
                            top: "40vh",
                            left: "20vw",
                            cursor: "pointer",
                            zIndex: 100,
                        }}
                        key="back"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "easeIn", duration: 1 }}
                        onClick={handleBack}
                    >
                        <ArrowBackIosNewIcon
                            color="white"
                            sx={{
                                margin: "0vh 0.5vw 0 0",
                                color: "white",
                                zIndex: 100,
                            }}
                        >
                            <h2 className="backButton">Back</h2>
                        </ArrowBackIosNewIcon>
                    </m.div>

                    <AnimatePresence>
                        {state === 1 && (
                            <m.div
                                className="sliderBox"
                                key="gran"
                                initial={{ y: "100vh" }}
                                animate={{ y: "0vh" }}
                                transition={{
                                    ease: "easeIn",
                                    duration: 0.5,
                                }}
                                exit={{
                                    x: "100vw",
                                    transition: {
                                        ease: "easeIn",
                                        duration: 0.5,
                                    },
                                }}
                            >
                                <GranularitySelector
                                    {...{
                                        setGranularity,
                                        handleDone,
                                    }}
                                />
                            </m.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {state === 2 && (
                            <m.div
                                className="sliderBox"
                                key="startDate"
                                initial={{ x: "-100vw" }}
                                animate={{ x: "0vw" }}
                                transition={{ ease: "easeIn", duration: 0.5 }}
                                exit={{
                                    y: "-100vw",
                                    transition: {
                                        ease: "easeIn",
                                        duration: 0.5,
                                    },
                                }}
                            >
                                <DatePickerStart
                                    {...{
                                        selectedStart,
                                        handleStart,
                                    }}
                                />
                            </m.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {state === 3 && (
                            <m.div
                                className="sliderBox"
                                key="endDate"
                                initial={{ y: "100vw" }}
                                animate={{ y: "0vw" }}
                                transition={{ ease: "easeIn", duration: 0.5 }}
                                exit={{
                                    x: "100vw",
                                    transition: {
                                        ease: "easeIn",
                                        duration: 0.5,
                                    },
                                }}
                            >
                                <DatePickerEnd
                                    {...{
                                        selectedEnd,
                                        handleBack,
                                        handleEnd,
                                        selectedStart,
                                    }}
                                />
                            </m.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
};
