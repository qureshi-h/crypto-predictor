import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoadingScreen } from "../Components/LoadingScreen";
import { PlotDisplay } from "../Components/PlotDisplay";
import TechnicalIndicatorDisplay from "../Components/TechnicalIndicatorDisplay";
import { motion as m } from "framer-motion/dist/framer-motion";
import SMA from "../res/SMA.png";
import EMA from "../res/EMA.png";

const getDate = (date) => {
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    return [
        (dd > 9 ? "" : "0") + dd,
        (mm > 9 ? "" : "0") + mm,
        date.getFullYear(),
    ].join("/");
};

const TI = [
    {
        key: "SMA",
        title: "Simple Moving Average",
        info:
            "is calculated simply as the mean of the price values over the specified window period:",
        initial: { x: "-100vw" },
        image: SMA,
    },
    {
        key: "EMA",
        title: "Exponential Moving Average",
        info:
            "places a greater weight and significance on the most recent data points. Given smoothing operator, S:",
        initial: { x: "100vw" },
        image: EMA,
    },
];

const testData = {
    EMA: [
        { 5: [16561.1, 240.66, 0.79] },
        { 10: [16611.33, 457.57, 1.66] },
        { 25: [16807.66, 944.72, 4.14] },
        { 50: [17395.42, 1480.19, 7.18] },
        { 100: [18390.48, 2060.43, 10.34] },
        { 200: [19353.1, 2530.5, 12.75] },
    ],

    SMA: [
        { 5: [16556.28, 277.05, 0.84] },
        { 10: [16624.47, 533.78, 1.84] },
        { 25: [16730.99, 1203.57, 5.1] },
        { 50: [17101.45, 1269.14, 7.12] },
        { 100: ["NaN", "NaN", "NaN"] },
        { 200: ["NaN", "NaN", "NaN"] },
    ],

    support_resistance: [
        [
            "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-historical.png",
            "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-levels.png",
            "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-trendlines.png",
            "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-both.png",
            "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-optimised-historical.png",
            "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-optimised-levels.png",
            "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-optimised-trendlines.png",
            "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-optimised-both.png",
        ],
    ],
    id: "1851b6d5-5572-496e-8e48-6cdbe72249a3",
    error: "",
    status_code: 200,
};

const getLabelMultiplier = (granularity) => {
    switch (granularity) {
        case 60:
            return { label: "minutes", multiplier: 1 };
        case 300:
            return { label: "minutes", multiplier: 5 };
        case 900:
            return { label: "minutes", multiplier: 15 };
        case 3600:
            return { label: "hours", multiplier: 1 };
        case 21600:
            return { label: "hours", multiplier: 6 };
        case 84600:
            return { label: "days", multiplier: 1 };
        default:
            return {
                error:
                    "granularity must be one of 60, 300, 900, 3600, 21600, 84600",
            };
    }
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
        },
    },
};

export const AnalysisPage = () => {
    const {
        coin,
        coinName,
        granularity,
        start_date,
        end_date,
    } = useLocation().state;
    const [thresholdX, setThresholdX] = React.useState(0.15);
    const [thresholdY, setThresholdY] = React.useState(0.15);
    const [data, setData] = React.useState(testData);
    const [loading, setLoading] = React.useState(true);
    const [loadingPlot, setLoadingPlot] = React.useState(false);

    useEffect(() => {
        // getData(coin, granularity, start_date, end_date);
        setLoading(false);
    }, []);

    const handleReRun = (setcurrentVersion) => {
        setLoadingPlot(true);
        fetch("http://localhost:5001/analyse/reRun", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
            body: JSON.stringify({
                id: data["id"],
                threshold_x: thresholdX,
                threshold_y: thresholdY,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status_code === 200) {
                    let version = data["support_resistance"].length;
                    const newPlots = data["support_resistance"].concat(
                        response["support_resistance"]
                    );
                    setData({ ...data, support_resistance: newPlots });
                    setLoadingPlot(false);
                    setcurrentVersion(version);
                }
            });
    };

    const getData = () => {
        fetch("http://localhost:5001/analyse/getAnalysis", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
            body: JSON.stringify({
                coin,
                granularity,
                start_date: start_date.getTime(),
                end_date: end_date.getTime(),
                threshold_x: thresholdX,
                threshold_y: thresholdY,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                setData(response["analysis"]);
                setLoading(false);
                console.log(response["analysis"]);
            });
    };

    return (
        <div
            className="analysis"
            style={{
                backgroundBlendMode: loading ? "overlay" : "normal",
            }}
        >
            {loading && (
                <div
                    style={{
                        display: "inline-flex",
                        width: "100vw",
                        height: "100vh",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "-3vh -3vw 0  0",

                        position: "absolute",
                    }}
                >
                    <LoadingScreen />
                </div>
            )}

            <div
                style={{
                    filter: loading ? "brightness(50%)" : "brightness(100%)",
                }}
            >
                <div className="title">
                    <h4 style={{ fontSize: "2rem", color: "white" }}>
                        {coinName} ({getDate(start_date)} - {getDate(end_date)})
                    </h4>
                </div>

                <div
                    style={{
                        border: "0.01em solid aqua",
                        width: "90vw",
                        opacity: "50%",
                        margin: "7vh 5vw 5vh 5vw",
                    }}
                />

                {!loading && (
                    <>
                        <m.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            key="TI"
                        >
                            {TI.map((object) => (
                                <m.div
                                    key={object.key}
                                    transition={{
                                        ease: "easeOut",
                                        duration: 0.5,
                                    }}
                                    variants={{
                                        hidden: object.initial,
                                        show: { x: "0vw" },
                                    }}
                                >
                                    <TechnicalIndicatorDisplay
                                        key={object.key}
                                        data={data[object.key]}
                                        granularityLabel={getLabelMultiplier(
                                            granularity
                                        )}
                                        title={object.title}
                                        info={object.info}
                                        image={object.image}
                                    />
                                </m.div>
                            ))}
                            <m.div
                                key="plot"
                                transition={{
                                    ease: "easeOut",
                                    duration: 0.5,
                                }}
                                variants={{
                                    hidden: TI[TI.length - 2].initial,
                                    show: { x: "0vw" },
                                }}
                            >
                                <PlotDisplay
                                    {...{
                                        plots: data["support_resistance"],
                                        thresholdX,
                                        setThresholdX,
                                        thresholdY,
                                        setThresholdY,
                                        handleReRun,
                                        loadingPlot,
                                    }}
                                />
                            </m.div>
                        </m.div>
                    </>
                )}
            </div>
        </div>
    );
};
