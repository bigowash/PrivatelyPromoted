const help = Object.create(null);
const fs = require('fs')
const { spawn } = require('child_process');

help.getData = function (data, filename) {

    fs.writeFile("./web-app/static/database/" + filename, JSON.stringify(data), (err, data) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}


help.createInsights = function (insightID, userProfile) {
    console.log("Here in the helperfile - create insights function", insightID, userProfile);

    const pythonProcess = spawn('python', ['./web-app/static/database/user-insight-builder.py', insightID, userProfile]);
    console.log("pythonProcess");
    let returnedData;
    pythonProcess.stdout.on('data', (data) => {
        returnedData = data;
        console.log(`Python output: ${data}`);
        // console.log("inside");
    });
    console.log("pythonProcess");
    return returnedData;
}

module.exports = help;