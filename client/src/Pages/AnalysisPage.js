import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const getLabelMultiplier = (granularity) => {
    console.log(granularity);
    switch (granularity) {
        case 60:
            return { label: "minutes", multiplier: 1 };
        case 300:
            return { label: "minutes", multiplier: 5 };
        case 900:
            return { label: "minutes", multiplier: 15 };
        case 60:
            return { label: "hours", multiplier: 1 };
        case 21600:
            return { label: "hours", multiplier: 6 };
        case 84600:
            return { label: "days", multiplier: 1 };
    }
};

export const AnalysisPage = () => {
    const { coin, granularity, start_date, end_date } = useLocation().state;
    const [thresholdX, setThresholdX] = React.useState(0.2);
    const [thresholdY, setThresholdY] = React.useState(0.2);
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

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

            support_resistance: {
                historical:
                    "./plots/17eeccf9-a0f7-4a96-9e31-57cfac9a3c5d-historical",
                levels: "./plots/17eeccf9-a0f7-4a96-9e31-57cfac9a3c5d-levels",
                trendline:
                    "./plots/17eeccf9-a0f7-4a96-9e31-57cfac9a3c5d-trendline",
                optimised_historical:
                    "./plots/17eeccf9-a0f7-4a96-9e31-57cfac9a3c5d-optimised-historical",
                optimised_levels:
                    "./plots/17eeccf9-a0f7-4a96-9e31-57cfac9a3c5d-optimised-levels",
                optimised_trendlines:
                    "./plots/17eeccf9-a0f7-4a96-9e31-57cfac9a3c5d-optimised-trendlines",
            },
            error: "",
            status_code: 200,
        });
        setLoading(false);
    }, []);

    const getData = () => {
        fetch("http://localhost:5001/analyse/", {
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
                console.log(data);
                setData(data);
            });
    };

    return (
        <div className="analysis">
            {!loading && (
                <div>
                    <div className="title">
                        <h4 style={{ fontSize: "2rem", color: "white" }}>
                            {coin} ({getDate(start_date)} - {getDate(end_date)})
                        </h4>
                    </div>
                    <TechnicalIndicatorDisplay
                        data={data["SMA"]}
                        granularityLabel={getLabelMultiplier(granularity)}
                        title="SMA"
                        info="is calculated simply as the mean of the price values
                        over the specified window period"
                    />

                    <TechnicalIndicatorDisplay
                        data={data["EMA"]}
                        granularityLabel={getLabelMultiplier(granularity)}
                        title="EMA"
                        info="is calculated simply as the mean of the price values
                        over the specified window period"
                    />
                </div>
            )}
        </div>
    );
};
