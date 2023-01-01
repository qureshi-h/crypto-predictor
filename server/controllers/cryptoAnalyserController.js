const { spawnSync } = require("child_process");

exports.analyseCoin = async (req, res) => {
    try {
        const { coin, granularity, start_date, end_date } = req.body;

        const script = "../analysis/analysis.py";
        const { stdout, stderr } = spawnSync("python3", [
            script,
            coin,
            granularity,
            start_date,
            end_date,
        ]);

        console.log(coin, granularity, start_date, end_date);

        res.status(200).json({
            status_code: 200,
            pdf: `${stdout}`,
            error: `${stderr}`,
        });
    } catch (error) {
        res.status(400).json({
            status_message: error.message,
        });
    }
};
