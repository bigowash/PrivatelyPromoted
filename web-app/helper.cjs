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
};

async function readUserFile(user) {
    return new Promise((resolve, reject) => {
        const filePath = `./web-app/static/database/userfiles/user-${user}.json`;
        fs.readFile(filePath, "utf8", (err, data) => {
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
        fs.readFile(filePath, "utf8", (err, data) => {
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
        fs.readFile(
            "./web-app/static/database/userProfiles.csv",
            "utf8",
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const rows = data.split("\n");
                    const headers = rows[0].split(",");
                    headers[2] = headers[2].replace(/\r/g, "");
                    const results = [];
                    for (let i = 1; i < rows.length - 1; i++) {
                        const values = rows[i].split(",");
                        const rowObject = {};
                        for (let j = 0; j < headers.length; j++) {
                            rowObject[headers[j]] = values[j];
                        }
                        results.push(rowObject);
                    }
                    resolve(results);
                }
            }
        );
    });
}

function sortLists(list1, list2) {
    var sortedList1 = list1.slice().sort(function (a, b) {
        return b - a;
    });
    var sortedList2 = [];
    for (var i = 0; i < sortedList1.length; i++) {
        var index = list1.indexOf(sortedList1[i]);
        sortedList2.push(list2[index]);
    }
    return [sortedList1, sortedList2];
}

function randomizeLists(list1, list2) {
    var combinedList = [];
    for (var i = 0; i < list1.length; i++) {
        combinedList.push({
            key: Math.random(),
            value1: list1[i],
            value2: list2[i]
        });
    }
    combinedList.sort(function (a, b) {
        return a.key - b.key;
    });
    var randomizedList1 = [];
    var randomizedList2 = [];
    for (var i = 0; i < combinedList.length; i++) {
        randomizedList1.push(combinedList[i].value1);
        randomizedList2.push(combinedList[i].value2);
    }
    return [randomizedList1, randomizedList2];
}

help.generateImpression = async function (website_data) {
    console.log("Generating an impression");
    console.log("Here is the website data", website_data);

    // need to get a random user
    // look through the csv file
    const users = [];
    const userNames = [];
    return new Promise((resolve, reject) => {
        readDataFromCSV()
            .then((data) => {
                console.log(data);
                data.forEach((el) => {
                    users.push(el.id.substring(1));
                    userNames.push(el.name.substring(1));
                });

                let user = users[Math.floor(Math.random() * users.length)];
                console.log(user);
                user = user.replace(/\r/g, "");

                readUserFile(user)
                    .then((userObject) => {
                        // got the preferences of the user
                        const totalPref = getTotalPreferences(userObject);
                        const selectedPref = getSelectedPreferences(userObject);
                        const values = [];

                        for (let i = 0; i < selectedPref.length; i++) {
                            values.push(Object.keys(selectedPref[i]));
                        }

                        const listSelectedCat = values;

                        const arr1d = listSelectedCat.map((item) => item[0]);
                        console.log("User list", arr1d);

                        // website_data has the preferences of the advertisers

                        // get the advertisements
                        getAdverts()
                            .then((advertList) => {
                                const newAdvList = [];

                                console.log(getSelectedPreferencesFromUserObject(userObject));

                                for (let i = 0; i < advertList.length; i++) {
                                    let flag = true;

                                    // skip if the website does not like that theme
                                    if (
                                        !website_data.selectedThemes.includes(
                                            advertList[i].advertTheme
                                        )
                                    ) {
                                        continue;
                                    }

                                    const l =
                                        advertList[i]
                                            .requiredTargetedDemographic;

                                    for (const key in l) {
                                        flag = false;
                                        // console.log(key)
                                        // console.log(typeof selectedPref)
                                        // console.log(selectedPref)
                                        if (!arr1d.includes(key)) {
                                            break;
                                        } else {
                                            // iterate through the list selectedPref
                                            for (
                                                let j = 0;
                                                j < selectedPref.length;
                                                j++
                                            ) {
                                                const el = selectedPref[j];
                                                // console.log(typeof el, el)
                                                // console.log(j)
                                                const catgeory =
                                                    Object.keys(el)[0];

                                                if (key == catgeory && !flag) {
                                                    for (let k = 0; k < el[catgeory].value.length; k++) {
                                                        const val = el[catgeory].value[k];
                                                        if (l[key] == val) {
                                                            flag = true;
                                                            break;
                                                        } else { flag = false; }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (flag) {
                                        newAdvList.push(advertList[i]);
                                    }
                                }
                                console.log(
                                    "number of possible adverts that fit",
                                    newAdvList.length
                                );
                                // all ads have the required things,
                                // check which has the most recommended

                                let rates = {};

                                for (let i = 0; i < newAdvList.length; i++) {
                                    const l =
                                        newAdvList[i]
                                            .recommendedTargetedDemographic;
                                    rates[newAdvList[i].advertID] = 0;

                                    for (const key in l) {
                                        if (arr1d.includes(key)) {
                                            // check if the values are the same
                                            console.log(key);
                                            console.log(selectedPref);
                                            for (let j = 0; j < selectedPref.length; j++) {
                                                const el = selectedPref[j];
                                                const catgeory =
                                                    Object.keys(el)[0];
                                                if (catgeory == key) {
                                                    const val =
                                                        el[catgeory].value[0];
                                                    if (l[key] == val) {
                                                        rates[
                                                            newAdvList[
                                                                i
                                                            ].advertID
                                                        ] += 1;
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }

                                console.log(rates);

                                const listOfRates = [];
                                const listOfIds = [];
                                for (const [key, value] of Object.entries(
                                    rates
                                )) {
                                    listOfRates.push(value);
                                    listOfIds.push(key);
                                }

                                if (listOfRates.length == 0) {
                                    console.log("No adverts match :(");
                                    return null;
                                }
                                // in case they both have the same rate (i.e 0) so that its not always the same one that 'wins
                                const randomLists = randomizeLists(
                                    listOfRates,
                                    listOfIds
                                );
                                const sortedLists = sortLists(
                                    randomLists[0],
                                    randomLists[1]
                                );

                                console.log(sortedLists);
                                // so now i have rates.length advertisements that
                                // are rated in terms of how much the recommended features match up

                                // the first element should be the displayed ad
                                const selectedAd = sortedLists[1][0];

                                // now i need to return the advert to the page
                                // need to update its stats

                                let ad;
                                for (let j = 0; j < advertList.length; j++) {
                                    if (advertList[j].advertID == selectedAd) {
                                        ad = advertList[j];
                                    }
                                }
                                console.log(ad);

                                // update stats
                                ad.numViews += 1;
                                website_data.money += parseFloat(ad.maxSpend);
                                website_data.times += 1;

                                // console.log(userObject);
                                // user object update is a bit more complicated,
                                // need to iterate thorugh the required and reccomeneed insights and change the values
                                for (key in ad.requiredTargetedDemographic) {
                                    console.log(key);
                                    if (userObject.hasOwnProperty(key)) {
                                        for (let i = 0; i < userObject[key].length; i++) {
                                            const element = userObject[key][i];
                                            console.log(element.value);
                                            if (
                                                element.values[0] ==
                                                ad.requiredTargetedDemographic[key]
                                            ) {
                                                userObject[key][i].times[0] += 1;
                                                userObject[key][i].money[0] +=
                                                    parseFloat(ad.maxSpend);
                                            }
                                        }
                                    }
                                }

                                for (key in ad.recommendedTargetedDemographic) {
                                    console.log(key);
                                    if (userObject.hasOwnProperty(key)) {
                                        for (let i = 0; i < userObject[key].length; i++) {
                                            const element = userObject[key][i];
                                            console.log(element.value);
                                            if (
                                                element.values[0] ==
                                                ad.recommendedTargetedDemographic[
                                                key
                                                ]
                                            ) {
                                                userObject[key][i].times[0] += 1;
                                                userObject[key][i].money[0] +=
                                                    parseFloat(ad.maxSpend);
                                            }
                                        }
                                    }
                                }

                                console.log("Going in to add history");
                                // need to append it to the history file
                                updateDataJSON(ad, advertList);
                                addToDisplayHistory(
                                    ad,
                                    userObject,
                                    website_data, userNames[parseInt(user)]
                                );

                                resolve([ad.image, ad.maxSpend]);
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
                console.error("Error while reading data from CSV:", err);
            });
    });
};

function getSelectedPreferencesFromUserObject(userObject) {
    const rtnList = [];
    for (const [key, val] of Object.entries(userObject)) {
        // console.log(key, val)
        val.forEach(el => {
            for (let i = 0; i < el.selected.length; i++) {
                const l = el.selected[i];
                if (l) {
                    rtnList.push(`${key} : ${el.values[i]}`)
                }
            }
        });
    }
    return rtnList
}

function updateDataJSON(ad, advertList) {
    for (let i = 0; i < advertList.length; i++) {
        const add = advertList[i];
        if (add.advertID == ad.advertID) {
            advertList[i] = ad;
        }
    }

    fs.writeFile(
        "./web-app/static/database/adverts/data.json",
        JSON.stringify(advertList),
        (err, data) => {
            if (err) throw err;
            console.log("The file has been saved!");
        }
    );
}

async function readHistory() {
    return new Promise((resolve, reject) => {
        const filePath = `./web-app/static/database/history.json`;
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                console.log(data)
                const userObject = JSON.parse(data);
                resolve(userObject);
            }
        });
    });
}

function addToDisplayHistory(ad, user, website, username) {
    readHistory().then((history) => {
        // history = JSON.parse(history)
        console.log(history);
        objToAdd = {
            userdata: user,
            ad: ad,
            website: website,
            username: username,
        };
        history.push(objToAdd);

        //add to file
        fs.writeFile(
            "./web-app/static/database/history.json",
            JSON.stringify(history),
            (err, data) => {
                if (err) throw err;
                console.log("The file has been saved!");
            }
        );
    });
}

help.getUserButtonFromCSV = function () {
    return new Promise((resolve, reject) => {
        fs.readFile(
            "./web-app/static/database/userProfiles.csv",
            "utf8",
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }
        );
    });
};

help.getUserDataFromFile = function (id) {
    return new Promise((resolve, reject) => {
        fs.readFile(
            "./web-app/static/database/userfiles/user-" + id + ".json",
            "utf8",
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }
        );
    });
};

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
                            certainty: el.certainty,
                            value: el.values,
                            source: el.source
                        }
                    };
                    rtn.push(objecte);
                }
            }
        }
    }
    return rtn;
}

function getTotalPreferences(obj) {
    const rtn = [];
    for (const key in obj) {
        // console.log(key);
        // console.log(category);
        rtn.push(key);
    }
    return rtn;
}
module.exports = help;
