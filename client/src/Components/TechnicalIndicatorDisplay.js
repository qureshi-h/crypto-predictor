import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function TechnicalIndicatorDisplay(props) {
    function createData(window, value, rmse) {
        let currency = "$";
        window = `${window * props.granularityLabel.multiplier} ${
            props.granularityLabel.label
        }`;
        return { window, value: `${currency} ${value}`, rmse };
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
                                fontSize: "1.3rem",
                                color: "white",

                                padding: "1rem",
                                textAlign: "center",
                            }}
                        >
                            {props.title}
                        </h4>

                        <h4
                            style={{
                                fontSize: ".9rem",
                                color: "white",

                                padding: "1rem",
                                textAlign: "left",
                            }}
                        >
                            {props.info}
                        </h4>
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
                                        Window Length
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: "white",
                                        }}
                                        align="center"
                                    >
                                        Next Projected
                                    </TableCell>
                                    <TableCell
                                        sx={{ color: "white" }}
                                        align="right"
                                    >
                                        RMSE
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
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
                                            {row.rmse}
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