const { spawnSync } = require("child_process");

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

        const script = "../analysis/analysis.py";
        const { stdout, stderr } = spawnSync(
            "python3",
            [
                script,
                coin,
                granularity,
                start_date,
                end_date,
                threshold_x,
                threshold_y,
            ]
        );

        if (stderr.toString() !== "") throw Error("Error in python script");

        console.log(`${stderr}`);

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

        const script = "../analysis/rerun.py";
        const { stdout, stderr } = spawnSync(
            "python3",
            [script, id, threshold_x, threshold_y]
        );

        if (stderr.toString() !== "") throw Error("Error in python script");

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
