import React from "react";
import ReactLoading from "react-loading";

export const LoadingScreen = () => {
    return (
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
            <ReactLoading
                type="cylon"
                color="white"
                height={"6vh"}
                width={"6vw"}
            />
        </div>
    );
};
