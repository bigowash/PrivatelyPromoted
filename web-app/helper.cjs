const help = Object.create(null);
const fs = require("fs");
const { spawn } = require("child_process");

help.getData = function (data, filename) {
    console.log(filename);
    fs.writeFile(
        "./web-app/static/database/userfiles/" + filename,
        JSON.stringify(data),
        (err, data) => {
            if (err) throw err;
            console.log("The file has been saved!");
        }
    );
};

help.createInsights = function (insightID, userProfile) {
    console.log(
        "Here in the helperfile - create insights function",
        insightID,
        userProfile
    );

    const pythonProcess = spawn("python", [
        "./web-app/static/database/user-insight-builder.py",
        insightID,
        userProfile
    ]);
    let returnedData;
    pythonProcess.stdout.on("data", (data) => {
        returnedData = data;
        console.log(`Python output: ${data}`);
        console.log("data", returnedData);
    });
    return returnedData;
};

module.exports = help;
