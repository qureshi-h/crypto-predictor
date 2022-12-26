import * as React from "react";
import { DayPicker } from "react-day-picker";
import "../DatePicker.css";

export const DatePickerEnd = ({ selectedEnd, handleEnd, selectedStart }) => {
    return (
        <div style={{ marginTop: "40vh" }}>
            <DayPicker
                mode="single"
                fromDate={selectedStart}
                toDate={new Date()}
                selected={selectedEnd}
                onSelect={handleEnd}
                captionLayout="dropdown"
                footer={
                    <p style={{ color: "#FFD700", fontFamily: "Montserrat" }}>
                        Select End Date
                    </p>
                }
            />
        </div>
    );
};
