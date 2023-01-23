const { spawnSync } = require("child_process");
require("dotenv").config();

exports.analyseCoin = async (req, res) => {
    try {
        const {
            coin,
            granularity,
            start_date,
            end_date,
            threshold_x,
            threshold_y,
        } = req.body;

        const file = "./analysis/analysis.py";

        const python =
            process.env.MODE === "DEVELOPMENT"
                ? process.env.PYTHON_ENVIRONMENT
                    ? process.env.PYTHON_ENVIRONMENT
                    : process.env.CONDA_PYTHON_EXE
                : "python3";

        const { stdout, stderr } = spawnSync(python, [
            file,
            coin,
            granularity,
            start_date,
            end_date,
            threshold_x,
            threshold_y,
        ]);

        if (!stderr || stderr.toString() !== "") throw Error(stderr.toString());

        res.status(200).json({
            status_code: 200,
            analysis: JSON.parse(`${stdout}`),
        });
    } catch (error) {
        res.status(400).json({
            status_message: error.message,
        });
    }
};

exports.reRun = async (req, res) => {
    try {
        const { id, threshold_x, threshold_y } = req.body;

        const file = "./analysis/rerun.py";
        const python =
            process.env.MODE === "DEVELOPMENT"
                ? process.env.PYTHON_ENVIRONMENT
                    ? process.env.PYTHON_ENVIRONMENT
                    : process.env.CONDA_PYTHON_EXE
                : "python3";

        const { stdout, stderr } = spawnSync(python, [
            file,
            id,
            threshold_x,
            threshold_y,
        ]);

        if (stderr.toString() !== "") throw Error(stderr.toString());

        res.status(200).json({
            status_code: 200,
            support_resistance: JSON.parse(`${stdout}`),
        });
    } catch (error) {
        res.status(400).json({
            status_message: error.message,
        });
    }
};
