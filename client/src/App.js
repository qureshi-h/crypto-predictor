import "./App.css";
import React from "react";
import { SelectPage } from "./Pages/SelectPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnalysisPage } from "./Pages/AnalysisPage";

require("dotenv").config();

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<SelectPage />} />
                    <Route exact path="/analysis" element={<AnalysisPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
