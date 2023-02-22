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

    const pythonProcess = spawn("python3", [
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

async function readUserFile(user) {
    return new Promise((resolve, reject) => {
        const filePath = `./web-app/static/database/userfiles/user-${user}.json`;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const userObject = JSON.parse(data);
                resolve(userObject);
            }
        });
    });
}

async function getAdverts() {
    return new Promise((resolve, reject) => {
        const filePath = `./web-app/static/database/adverts/data.json`;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const userObject = JSON.parse(data);
                resolve(userObject);
            }
        });
    });
}

function readDataFromCSV() {
    return new Promise((resolve, reject) => {
        fs.readFile('./web-app/static/database/userProfiles.csv', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const rows = data.split('\n');
                const headers = rows[0].split(',');
                const results = [];
                for (let i = 1; i < rows.length - 1; i++) {
                    const values = rows[i].split(',');
                    const rowObject = {};
                    for (let j = 0; j < headers.length; j++) {
                        rowObject[headers[j]] = values[j];
                    }
                    results.push(rowObject);
                }
                resolve(results);
            }
        });
    });
}

help.generateImpression = async function (website_data) {
    console.log("Generating an impression");
    console.log("Here is the website data", website_data);

    // need to get a random user
    // look through the csv file 
    const users = [];

    readDataFromCSV()
        .then((data) => {
            data.forEach(el => {
                users.push(el.id.substring(1))
            });

            const user = users[Math.floor(Math.random() * users.length)]

            readUserFile(user)
                .then((userObject) => {
                    // console.log(userObject);

                    // got the preferences of the user
                    const totalPref = getTotalPreferences(userObject)
                    const selectedPref = getSelectedPreferences(userObject)

                    // console.log(totalPref)
                    // console.log(selectedPref)

                    // website_data has the preferences of the advertisers

                    // get the advertisements
                    getAdverts()
                        .then((advertList) => {
                            console.log(advertList)
                            // code here



                        })
                        .catch((err) => {
                            console.error(err);
                        });


                })
                .catch((err) => {
                    console.error(err);
                });

        })
        .catch((err) => {
            console.error('Error while reading data from CSV:', err);
        });


    // stable marriage algorithm part, match an ad to the user
    // how to do the ad selection. 
}


help.getUserButtonFromCSV = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./web-app/static/database/userProfiles.csv', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

help.getUserDataFromFile = function (id) {
    return new Promise((resolve, reject) => {
        fs.readFile('./web-app/static/database/userfiles/user-' + id + '.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function getSelectedPreferences(obj) {
    const rtn = [];
    for (const key in obj) {
        const category = obj[key];
        const catKey = key;
        // console.log(key);

        // iterate through the different insight generators on the same key
        for (let i = 0; i < category.length; i++) {
            const el = category[i];
            //iterate though the different sections in a insight like the different types of hobbies
            for (let j = 0; j < el.selected.length; j++) {
                const e = el.selected[j];
                // console.log(e)
                if (e) {
                    const objecte = {
                        [catKey]: {
                            "certainty": el.certainty,
                            "value": el.values,
                            "source": el.source
                        }
                    }
                    rtn.push(objecte)
                }
            }
        }
    }
    return rtn
}

function getTotalPreferences(obj) {
    const rtn = [];
    for (const key in obj) {
        // console.log(key);
        // console.log(category);
        rtn.push(key);
    }
    return rtn
}
module.exports = help;
