import * as React from "react";
import { DayPicker } from "react-day-picker";
import "../DatePicker.css";

export const DatePickerStart = ({ selectedStart, handleStart }) => {
    return (
        <div style={{ marginTop: "40vh" }}>
            <DayPicker
                mode="single"
                fromYear={2010}
                toDate={new Date()}
                selected={selectedStart}
                onSelect={handleStart}
                captionLayout="dropdown"
                footer={
                    <p style={{ color: "#FFD700", fontFamily: "Montserrat" }}>
                        Select Start Date
                    </p>
                }
            />
        </div>
    );
};
