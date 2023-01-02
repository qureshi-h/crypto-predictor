import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AnalysisPage = () => {
    const { coin, granularity, start_date, end_date } = useLocation().state;

    useEffect(() => {
        getData(coin, granularity, start_date, end_date);
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
                start_date,
                end_date,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    return <div>AnalysisPage</div>;
};
