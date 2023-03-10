import Ajax from "../ajax.js";
const button = document.getElementById("button_trial");
const input = document.getElementById("userProfile-input");

// Get the information from the link (what user is selected)
const params = new URLSearchParams(window.location.search);
const name = params.get("name");

let totalMoney = 0;
let totalUses = 0;

const moneyText = document.getElementById("money_total");
const usesText = document.getElementById("uses_total");

const userButtons = document.getElementById("userButtons");
const table = document.getElementById("table");

// Fill in subtitle
const subtitle = document.getElementById("subtitle");
subtitle.textContent = `Welcome to the insights generator page. This simulates how ${name} would develop insights on an internet user as they browse on their site. The insights generator page artificially generates such insights.`;

// Add homepage link to title
const title = document.getElementById("title");
title.addEventListener("click", function () {
    window.location.href = "../";
});

// Add preferences buttons
const addPreferences = async function () {
    console.log("Preferences are loading");

    // delete current buttons
    while (userButtons.firstChild) {
        userButtons.removeChild(userButtons.firstChild);
    }

    // prepare request
    const request = {
        task: "get-user-buttons"
    };

    const template = Ajax.query(request);
    console.log("Request: " + JSON.stringify(request));

    // upon the return of the request
    template.then(function (object) {
        console.log("Response: " + JSON.stringify(object));
        // rest of the code here
        const data = object.data;
        // console.log(data)

        const lines = data.split("\n");

        for (let i = 1; i < lines.length - 1; i++) {
            const el = lines[i].split(", ");
            const name = el[1];
            let id = el[2];

            id = id.replace(/\r/g, "");

            const a = document.createElement("button");
            a.classList += "intro-button";
            a.textContent = id;
            a.id += "user-" + id;

            a.addEventListener("click", function () {
                profileSelected(id);
            });

            userButtons.appendChild(a);
        }
    });
};

button.addEventListener("click", async function () {
    console.log("Button Clicked");

    console.log(input);
    const userid = input.value;

    // prepare request
    const request = {
        task: "create-insights",
        insightID: name,
        userProfile: userid
    };

    console.log("Request: " + JSON.stringify(request));
    const template = await Ajax.query(request);

    console.log("Response: " + JSON.stringify(template));
    addPreferences();
});

const profileSelected = async function (id) {
    console.log("Clear our the table");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    // prepare request
    const request = {
        task: "get-user-file",
        userid: id
    };

    const template = Ajax.query(request);
    console.log("Request: " + JSON.stringify(request));

    // upon the return of the request
    template.then(function (object) {
        console.log("Response: " + JSON.stringify(object));
        let data = object.data;
        // data from file
        data = JSON.parse(data);

        // get insights categories and sort alphabetically
        const keys = [];
        for (const i in data) {
            keys.push(i);
        }
        keys.sort();

        console.log("building the table");

        // build the table

        // Create the header row
        const headerRow = document.createElement("thead");
        const headerCategory = document.createElement("th");
        headerCategory.textContent = "Category";
        headerRow.appendChild(headerCategory);

        const headerValue = document.createElement("th");
        headerValue.textContent = "Value";
        headerRow.appendChild(headerValue);

        const headerCertainty = document.createElement("th");
        headerCertainty.textContent = "Certainty";
        headerRow.appendChild(headerCertainty);

        const headerMoney = document.createElement("th");
        headerMoney.textContent = "MoneyIn";
        headerRow.appendChild(headerMoney);

        const headerTimes = document.createElement("th");
        headerTimes.textContent = "#ofTimesUsed";
        headerRow.appendChild(headerTimes);

        table.appendChild(headerRow);
        // console.log("element");

        // create the body rows based of file info
        keys.forEach((category) => {
            // console.log(data[category].length)

            // console.log(Array.isArray(data[category]['values']))
            for (let index = 0; index < data[category].length; index++) {
                const element = data[category][index];
                // console.log("element");
                // console.log(element);
                // console.log(element["source"]);
                // add to the list of categories

                if (Array.isArray(element.values)) {
                    for (let i = 0; i < element.values.length; i++) {
                        if (element.source[i] === name) {
                            const tempInfo = {
                                category,
                                values: element.values[i],
                                certainty: element.certainty[i],
                                selected: element.selected[i],
                                source: element.source[i],
                                money: element.money[i],
                                times: element.times[i]
                            };
                            const dataRow = makeTable(tempInfo, i, index);
                            table.appendChild(dataRow);
                        }
                    }
                } else {
                    if (element.source == name) {
                        const tempInfo = {
                            category,
                            values: element.values,
                            certainty: element.certainty,
                            selected: element.selected,
                            source: element.source,
                            money: element.money,
                            times: element.times
                        };
                        // const dataRow = makeTable(tempInfo, 1)
                        const dataRow = makeTable(tempInfo, 1, index);
                        table.appendChild(dataRow);
                    }
                }
            }
        });
        moneyText.textContent = totalMoney;
        usesText.textContent = totalUses;
    });
};

const makeTable = function (values, i, insightProvider) {
    // console.log(values, i, insightProvider)
    const dataRow = document.createElement("tr");

    // category
    // console.log("adding cat", values["category"])
    const catSection = document.createElement("td");
    catSection.textContent = values.category;
    dataRow.appendChild(catSection);

    // value
    const valueSection = document.createElement("td");
    valueSection.textContent = values.values;
    valueSection.id = insightProvider + values.category + i + "value";
    // console.log(valueSection.textContent)
    dataRow.appendChild(valueSection);

    // certainty
    const certaintySection = document.createElement("td");
    certaintySection.textContent = values.certainty;
    dataRow.appendChild(certaintySection);

    // console.log("values");
    // money
    const moneySec = document.createElement("td");
    moneySec.textContent = values.money;
    totalMoney += values.money;
    dataRow.appendChild(moneySec);

    // money
    const timesSec = document.createElement("td");
    timesSec.textContent = values.times;
    totalUses += values.times;
    dataRow.appendChild(timesSec);

    return dataRow;
};

addPreferences();
