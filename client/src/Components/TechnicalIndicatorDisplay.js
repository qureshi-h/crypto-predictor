import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { InfoToolTip } from "./InfoToolTip";

export default function TechnicalIndicatorDisplay(props) {
    function createData(window, value, rmse, mape) {
        let currency = "$";
        window = `${window * props.granularityLabel.multiplier} ${
            props.granularityLabel.label
        }`;

        value = value === "NaN" ? value : `${currency} ${value}`;
        return { window, value, rmse, mape };
    }

    const rows = props.data.map((object) => {
        let key = Object.keys(object);
        return createData(key, ...object[key]);
    });
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
                                fontSize: "1.1rem",
                                color: "white",

                                padding: "1rem",
                                textAlign: "center",
                            }}
                        >
                            {props.title}
                        </h4>

                        <h4
                            style={{
                                fontSize: ".85rem",
                                color: "white",

                                padding: "1rem",
                                textAlign: "left",
                            }}
                        >
                            {props.info}
                        </h4>

                        <img
                            src={props.image}
                            style={{
                                position: "absolute",
                                top: "60%",
                                width: "18vw",
                                marginTop: "5vh",
                                marginLeft: "1vw",
                            }}
                            alt="Technical Indicator Formula"
                        />
                    </div>
                    <div
                        style={{
                            width: "35vw",
                            backgroundColor: "rgb(10, 4, 30)",
                            boxShadow: "0px 4px 10px #707070",
                            borderRadius: "0rem 1rem 1rem 0rem",
                            padding: "1rem",
                        }}
                    >
                        <Table
                            sx={{
                                border: 0,
                                backgroundColor: "rgb(10, 4, 30)",
                                color: "white",
                            }}
                            size="small"
                        >
                            <TableHead>
                                <TableRow
                                    sx={{
                                        padding: "1rem",
                                        "td, th": {},
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            color: "white",
                                            textAlign: "left",
                                        }}
                                    >
                                        <>
                                            Window Length{" "}
                                            <InfoToolTip
                                                info={`Number of ${props.granularityLabel.label} data used to calculate projected value`}
                                            />
                                        </>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: "white",
                                        }}
                                        align="center"
                                    >
                                        <>
                                            Projected{" "}
                                            <InfoToolTip
                                                info={`Project value in the next ${props.granularityLabel.multiplier} ${props.granularityLabel.label}`}
                                            />
                                        </>
                                    </TableCell>
                                    <TableCell
                                        sx={{ color: "white" }}
                                        align="right"
                                    >
                                        <>
                                            RMSE{" "}
                                            <InfoToolTip info="Root Mean Sqaured Error" />
                                        </>
                                    </TableCell>
                                    <TableCell
                                        sx={{ color: "white" }}
                                        align="right"
                                    >
                                        <>
                                            MAPE{" "}
                                            <InfoToolTip info="Mean Absolute Percentage Error" />
                                        </>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.window}
                                        sx={{
                                            padding: "1rem",
                                            "td, th": {},
                                            "&:last-child td, &:last-child th": {
                                                border: 0,
                                            },
                                        }}
                                    >
                                        <TableCell
                                            sx={{
                                                color: "white",
                                                textIndent: "0.5vw",
                                            }}
                                            component="th"
                                            scope="row"
                                        >
                                            {row.window}
                                        </TableCell>
                                        <TableCell
                                            sx={{ color: "white" }}
                                            align="center"
                                        >
                                            {row.value}
                                        </TableCell>
                                        <TableCell
                                            sx={{ color: "white" }}
                                            align="right"
                                        >
                                            {(
                                                Math.round(row.rmse * 100) / 100
                                            ).toFixed(2)}
                                        </TableCell>
                                        <TableCell
                                            sx={{ color: "white" }}
                                            align="right"
                                        >
                                            {(
                                                Math.round(row.mape * 100) / 100
                                            ).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
