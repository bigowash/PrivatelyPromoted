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
    // let returnedData;
    pythonProcess.stdout.on("data", (data) => {
        // returnedData = data;
        console.log(`Python output: ${data}`);
        return { data };
    });
};

help.changeFile = function (data, filename) {
    console.log(filename);
    fs.writeFile(
        "./web-app/static/database/websites/" + filename,
        JSON.stringify(data),
        (err, data) => {
            if (err) throw err;
            console.log("The file has been saved!");
        }
    );
}

help.generateImpression = function (website_data) {
    console.log("Generating an impression");
    console.log("Here is the website data", website_data);

    // need to get a random user
    // get the list of filtered insights

    // need to look through available advertisments
    // look at what insights are required. 

    // stable marriage algorithm part, match an ad to the user
    // how to do the ad selection. 
}

module.exports = help;
