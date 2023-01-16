import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoadingScreen } from "../Components/LoadingScreen";
import { PlotDisplay } from "../Components/PlotDisplay";
import TechnicalIndicatorDisplay from "../Components/TechnicalIndicatorDisplay";

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
            "is calculated simply as the mean of the price values over the specified window period",
    },
    {
        key: "EMA",
        title: "Exponential Moving Average",
        info:
            "is calculated simply as the mean of the price values over the specified window period",
    },
];

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

export const AnalysisPage = () => {
    const { coin, granularity, start_date, end_date } = useLocation().state;
    const [thresholdX, setThresholdX] = React.useState(0.15);
    const [thresholdY, setThresholdY] = React.useState(0.15);
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    useEffect(() => {
        // getData(coin, granularity, start_date, end_date);
        setData({
            EMA: [
                { 5: [16862.43, 40.93] },
                { 10: [16925.18, 65.03] },
                { 25: [16995.62, 111.04] },
                { 50: [17009.26, 156.48] },
                { 100: [17013.96, 200.89] },
                { 200: [17030.91, 237.53] },
            ],

            SMA: [
                { 5: [16837.41, 49.57] },
                { 10: [16952.72, 77.15] },
                { 25: [17053.54, 129.83] },
                { 50: [17006.32, 195.54] },
                { 100: [16994.23, 262.72] },
                { 200: [16996.87, 310.26] },
            ],

            support_resistance: [
                "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-historical",
                "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-levels",
                "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-trendlines",
                "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-both",
                "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-optimised-historical",
                "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-optimised-levels",
                "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-optimised-trendlines",
                "plots/1851b6d5-5572-496e-8e48-6cdbe72249a3-optimised-both",
            ],
            id: "1851b6d5-5572-496e-8e48-6cdbe72249a3",
            error: "",
            status_code: 200,
        });
        sleep(5000).then(() => {
            setLoading(false);
        });
    }, []);

    const handleReRun = () => {
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
            .then((data) => {
                // setData(data);
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
            .then((data) => {
                // setData(data);
            });
    };

    return (
        <div
            className="analysis"
            style={{
                backgroundBlendMode: loading ? "overlay" : "normal",
            }}
        >
            {loading && <LoadingScreen />}
            <div
                style={{
                    filter: loading ? "brightness(50%)" : "brightness(100%)",
                }}
            >
                <div className="title">
                    <h4 style={{ fontSize: "2rem", color: "white" }}>
                        {coin} ({getDate(start_date)} - {getDate(end_date)})
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
                        {TI.map((object) => (
                            <TechnicalIndicatorDisplay
                                key={object.key}
                                data={data[object.key]}
                                granularityLabel={getLabelMultiplier(
                                    granularity
                                )}
                                title={object.title}
                                info={object.info}
                            />
                        ))}

                        <PlotDisplay
                            {...{
                                plots: data["support_resistance"],
                                thresholdX,
                                setThresholdX,
                                thresholdY,
                                setThresholdY,
                                handleReRun,
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
