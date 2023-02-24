import Ajax from "../ajax.js";

// Helper functions - to ease coding
const id = function (id) {
    return document.getElementById(id);
};

const qsa = function (selector) {
    return document.querySelectorAll(selector);
};

// all the data here
let userdata;

const categoriesList = [];
const sourcesList = [];

// Get the information from the link (what user is selected)
const params = new URLSearchParams(window.location.search);
const userid = params.get("id");
const userName = params.get("name");
const user_filename = "user-" + userid + ".json";
console.log("id: ", userid);
console.log("filename: ", user_filename);

// Fill in subtitle
const subtitle = id("subtitle");
subtitle.textContent = `Welcome to Settings ${userName}, here you can adjust the insights related to your data profile.`;

// Add homepage link to title
const title = id("title");
title.addEventListener("click", function () {
    window.location.href = "../";
});

///
// Table creation
///

const table = id("preferences-table");
const addPreferences = async function () {
    console.log("Preferences are loading");

    const response = await fetch("../database/userfiles/" + user_filename)
        .then((response) => response.text())
        .then((data) => {
            // Parse JSON data and save to variable
            data = JSON.parse(data);
            userdata = data;

            // Get insights categories and sort alphabetically
            const keys = [];
            for (const i in data) {
                keys.push(i);
            }
            keys.sort();

            console.log("building the table");

            /// Build the table

            // Create the header row
            const headerRow = document.createElement("thead");
            headerRow.classList.add("headerRow");

            const headerCheck = document.createElement("th");
            headerCheck.textContent = "Include";
            headerCheck.classList.add("headerCell");
            headerRow.appendChild(headerCheck);

            const headerCategory = document.createElement("th");
            headerCategory.textContent = "Category";
            headerCategory.classList.add("headerCell");
            headerRow.appendChild(headerCategory);

            const headerValue = document.createElement("th");
            headerValue.textContent = "Value";
            headerValue.classList.add("headerCell");
            headerRow.appendChild(headerValue);

            const headerCertainty = document.createElement("th");
            headerCertainty.textContent = "Certainty";
            headerCertainty.classList.add("headerCell");
            headerRow.appendChild(headerCertainty);

            const headerSource = document.createElement("th");
            headerSource.textContent = "Source";
            headerSource.classList.add("headerCell");
            headerRow.appendChild(headerSource);

            const headerInput = document.createElement("th");
            headerInput.textContent = "Change";
            headerInput.classList.add("headerCell");
            headerRow.appendChild(headerInput);

            const headerValidateInput = document.createElement("th");
            headerValidateInput.textContent = "Submit";
            headerValidateInput.classList.add("headerCell");
            headerRow.appendChild(headerValidateInput);

            table.appendChild(headerRow);

            // create the body rows based of file info
            keys.forEach((category) => {
                // console.log(data[category].length)

                // console.log(Array.isArray(data[category]['values']))
                for (let index = 0; index < data[category].length; index++) {
                    const element = data[category][index];

                    // add to the list of categories
                    if (!categoriesList.includes(category)) {
                        categoriesList.push(category);
                    }

                    if (Array.isArray(element.values)) {
                        for (let i = 0; i < element.values.length; i++) {
                            const tempInfo = {
                                category,
                                values: element.values[i],
                                certainty: element.certainty[i],
                                selected: element.selected[i],
                                source: element.source[i]
                            };
                            const dataRow = makeTable(tempInfo, i, index);
                            table.appendChild(dataRow);
                        }
                    } else {
                        const tempInfo = {
                            category,
                            values: element.values,
                            certainty: element.certainty,
                            selected: element.selected,
                            source: element.source
                        };
                        // const dataRow = makeTable(tempInfo, 1)
                        const dataRow = makeTable(tempInfo, 1, index);
                        table.appendChild(dataRow);
                    }
                }
            });
        });
};

const makeTable = function (values, i, insightProvider) {
    const dataRow = document.createElement("tr");
    dataRow.classList.add("tableRow");

    /// check
    const inputSection = document.createElement("td");
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.checked = values.selected;
    input.setAttribute("name", insightProvider + values.category + i);
    input.setAttribute("id", insightProvider + values.category + i + "check");

    inputSection.classList.add("checkbox");
    inputSection.classList.add("tableBodyCell");
    inputSection.appendChild(input);
    dataRow.appendChild(inputSection);

    /// category
    // console.log("adding cat", values["category"])
    const catSection = document.createElement("td");
    catSection.textContent = values.category;
    catSection.classList.add("category");
    catSection.classList.add("tableBodyCell");
    dataRow.appendChild(catSection);

    // value
    const valueSection = document.createElement("td");
    valueSection.textContent = values.values;
    valueSection.id = insightProvider + values.category + i + "value";
    valueSection.classList.add("valueCell");
    valueSection.classList.add("tableBodyCell");
    dataRow.appendChild(valueSection);

    // certainty
    const certaintySection = document.createElement("td");
    certaintySection.textContent = values.certainty;
    certaintySection.classList.add("certaintyCell");
    certaintySection.classList.add("tableBodyCell");
    dataRow.appendChild(certaintySection);

    // source + add to the sources list
    if (!sourcesList.includes(values.source)) {
        sourcesList.push(values.source);
    }
    const sourceSection = document.createElement("td");
    sourceSection.textContent = values.source;
    sourceSection.classList.add("sourceCell");
    sourceSection.classList.add("tableBodyCell");
    dataRow.appendChild(sourceSection);

    // change
    const changeSection = document.createElement("td");
    const changeText = document.createElement("input");
    changeText.setAttribute("type", "text");
    changeText.setAttribute("name", insightProvider + values.category);
    changeText.setAttribute(
        "id",
        insightProvider + values.category + i + "change"
    );
    changeSection.classList.add("changeTextCell");
    changeSection.classList.add("tableBodyCell");
    changeSection.appendChild(changeText);
    dataRow.appendChild(changeSection);

    // submit button
    const submitSection = document.createElement("td");
    const submitButton = document.createElement("button");
    submitSection.classList.add("submit-button");
    submitSection.classList.add("tableBodyCell");
    submitButton.setAttribute(
        "id",
        insightProvider + values.category + i + "button"
    );
    submitButton.addEventListener("click", function () {
        changeValue(insightProvider + values.category + i, values.category);
    });
    submitSection.appendChild(submitButton);
    dataRow.appendChild(submitSection);

    return dataRow;
};

const tableCat = id("categories");
console.log(tableCat);

const addSelector = function () {
    // console.log("in th sec");
    // categories first
    // console.log(categoriesList)
    for (let i = 0; i < categoriesList.length; i++) {
        const element = categoriesList[i];
        const row = document.createElement("tr");

        const col1 = document.createElement("td");
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.checked = true;
        input.setAttribute("name", "categoriesList0" + element);
        input.setAttribute("id", "categoriesList0" + element);
        input.addEventListener("click", function () {
            selectChange("category", element);
        });
        col1.appendChild(input);
        row.appendChild(col1);

        // category
        const col2 = document.createElement("td");
        col2.textContent = element;
        row.appendChild(col2);
        tableCat.appendChild(row);
    }

    for (let i = 0; i < sourcesList.length; i++) {
        const element = sourcesList[i];
        const row = document.createElement("tr");

        const col1 = document.createElement("td");
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.checked = true;
        input.setAttribute("name", "categoriesList0" + element);
        input.setAttribute("id", "categoriesList0" + element);
        input.addEventListener("click", function () {
            selectChange("sources", element);
        });
        col1.appendChild(input);
        row.appendChild(col1);

        // category
        const col2 = document.createElement("td");
        col2.textContent = element;
        row.appendChild(col2);
        tableCat.appendChild(row);
    }
};

addPreferences();

const saveButton = document.getElementById("save");
const selectAllButton = document.getElementById("selectAll");
const deselectAllButton = document.getElementById("deselectAll");

saveButton.addEventListener("click", function () {
    const selectedCategories = {};
    const checkboxes = qsa('input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        // console.log("checkboc", checkbox.name);
        const category = checkbox.name.split(/(\d+)/);
        console.log(userdata[category[2]][category[1]].selected);
        if (checkbox.checked) {
            userdata[category[2]][category[1]].selected[category[3]] = true;
        } else {
            userdata[category[2]][category[1]].selected[category[3]] = false;
        }
    });

    writeToFile(userdata, user_filename);
});

selectAllButton.addEventListener("click", function () {
    console.log("selecting all");
    const checkboxes = qsa('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = true;
    });
});

deselectAllButton.addEventListener("click", function () {
    console.log("deselecting all");
    const checkboxes = qsa('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });
});

function changeValue(idFinder, category) {
    // get the value from the text prompt
    const text = id(idFinder + "change").value;

    console.log("In the change value function", idFinder);

    if (text.length !== 0) {
        // change the value of the html element
        id(idFinder + "value").textContent = text;

        // change the value of the data
        const x = idFinder.split(/(\d+)/);
        console.log(x);
        // const x = category
        userdata[x[2]][x[1]].values[x[3]] = text;

        console.log(userdata);
        writeToFile(userdata, user_filename);
    } else {
        confirm("Please input an alternative");
    }
}

const writeToFile = async function (data, filename) {
    console.log(data);

    // prepare request
    const request = {
        task: "get-user-data",
        data,
        filename
    };

    const template = Ajax.query(request);
    console.log("Request: " + JSON.stringify(request));

    // upon the return of the request
    template.then(function (object) {
        console.log("Response: " + JSON.stringify(object));

        // rest of the code here
    });
};
