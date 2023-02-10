import Ajax from "../ajax.js";

// Helper functions - to ease coding
function id(id) {
    return document.getElementById(id);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

// all the data here
let userdata;

let categoriesList = [];
let sourcesList = [];

// Get the information from the link (what user is selected)
let params = new URLSearchParams(window.location.search);
let userid = params.get("id");
const user_filename = "user-" + userid + ".json"
console.log("id: ", userid);
console.log("filename: ", user_filename);

// Make the preferences table from the user file
let table = id("preferences-table");
async function addPreferences() {

    console.log("Preferences are loading");

    const response = await fetch('../database/userfiles/' + user_filename)
        .then(response => response.text())
        .then(data => {
            // data from file
            data = JSON.parse(data)
            userdata = data;

            // get insights categories and sort alphabetically
            const keys = [];
            for (const i in data) {
                keys.push(i)
            }
            keys.sort()

            console.log("building the table");

            // build the table

            // Create the header row
            const headerRow = document.createElement('tr');
            const headerCheck = document.createElement('th');
            headerCheck.textContent = 'Include';
            headerRow.appendChild(headerCheck);
            const headerCategory = document.createElement('th');
            headerCategory.textContent = 'Category';
            headerRow.appendChild(headerCategory);
            const headerValue = document.createElement('th');
            headerValue.textContent = 'Value';
            headerRow.appendChild(headerValue);
            const headerCertainty = document.createElement('th');
            headerCertainty.textContent = 'Certainty';
            headerRow.appendChild(headerCertainty);
            const headerSource = document.createElement('th');
            headerSource.textContent = 'Source';
            headerRow.appendChild(headerSource);
            const headerInput = document.createElement('th');
            headerInput.textContent = 'Change';
            headerRow.appendChild(headerInput);
            const headerValidateInput = document.createElement('th');
            headerValidateInput.textContent = 'Submit';
            headerRow.appendChild(headerValidateInput);

            table.appendChild(headerRow);

            // create the body rows based of file info
            keys.forEach(category => {
                // console.log(data[category].length)

                // console.log(Array.isArray(data[category]['values']))
                for (let index = 0; index < data[category].length; index++) {
                    const element = data[category][index];

                    // add to the list of categories
                    if (!categoriesList.includes(category)) {
                        categoriesList.push(category);
                    }

                    if (Array.isArray(element['values'])) {
                        for (let i = 0; i < element['values'].length; i++) {
                            const tempInfo = {
                                "category": category,
                                'values': element['values'][i],
                                'certainty': element['certainty'][i],
                                'selected': element['selected'][i],
                                'source': element['source'][i]
                            }
                            const dataRow = makeTable(tempInfo, i, index)
                            table.appendChild(dataRow);
                        }
                    } else {
                        const tempInfo = {
                            "category": category,
                            'values': element['values'],
                            'certainty': element['certainty'],
                            'selected': element['selected'],
                            'source': element['source']
                        }
                        // const dataRow = makeTable(tempInfo, 1)
                        const dataRow = makeTable(tempInfo, 1, index)
                        table.appendChild(dataRow);
                    }
                }

            });
            // addSelector();
        })
}

function makeTable(values, i, insightProvider) {

    const dataRow = document.createElement('tr');

    // check
    const inputSection = document.createElement('td');
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = values['selected'];
    input.setAttribute('name', insightProvider + values["category"] + i);
    input.setAttribute('id', insightProvider + values["category"] + i + 'check');
    inputSection.appendChild(input);
    dataRow.appendChild(inputSection);

    // category
    // console.log("adding cat", values["category"])
    const catSection = document.createElement('td');
    catSection.textContent = values["category"];
    dataRow.appendChild(catSection);

    // value
    const valueSection = document.createElement('td');
    valueSection.textContent = values["values"];
    valueSection.id = insightProvider + values["category"] + i + 'value';
    // console.log(valueSection.textContent)
    dataRow.appendChild(valueSection);

    // certainty
    const certaintySection = document.createElement('td');
    certaintySection.textContent = values["certainty"];
    dataRow.appendChild(certaintySection);

    // source + add to the sources list
    if (!sourcesList.includes(values["source"])) {
        sourcesList.push(values["source"]);
    }
    const sourceSection = document.createElement('td');
    sourceSection.textContent = values["source"];
    dataRow.appendChild(sourceSection);

    // change 
    const changeSection = document.createElement('td');
    const changeText = document.createElement('input');
    changeText.setAttribute('type', 'text');
    changeText.setAttribute('name', insightProvider + values["category"]);
    changeText.setAttribute('id', insightProvider + values["category"] + i + 'change');
    // changeText.setAttribute('id', values["category"] + '_id');
    changeSection.appendChild(changeText);
    dataRow.appendChild(changeSection);

    // submit button 
    const submitSection = document.createElement('td');
    const submitButton = document.createElement('button');
    submitButton.classList += "submit-button"
    submitButton.setAttribute('id', insightProvider + values["category"] + i + 'button');
    submitButton.addEventListener('click', function () {
        changeValue(insightProvider + values["category"] + i, values["category"]);
    });
    submitSection.appendChild(submitButton);
    dataRow.appendChild(submitSection);


    return dataRow;
}
const tableCat = id("categories");
console.log(tableCat);

function addSelector() {
    // console.log("in th sec");
    // categories first
    // console.log(categoriesList)
    for (let i = 0; i < categoriesList.length; i++) {
        const element = categoriesList[i];
        const row = document.createElement('tr');

        const col1 = document.createElement('td');
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.checked = true;
        input.setAttribute('name', "categoriesList0" + element);
        input.setAttribute('id', "categoriesList0" + element);
        input.addEventListener('click', function () {
            selectChange("category", element)
        });
        col1.appendChild(input);
        row.appendChild(col1)

        // category
        const col2 = document.createElement('td');
        col2.textContent = element;
        row.appendChild(col2);
        tableCat.appendChild(row);
    }

    for (let i = 0; i < sourcesList.length; i++) {
        const element = sourcesList[i];
        const row = document.createElement('tr');

        const col1 = document.createElement('td');
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.checked = true;
        input.setAttribute('name', "categoriesList0" + element);
        input.setAttribute('id', "categoriesList0" + element);
        input.addEventListener('click', function () {
            selectChange("sources", element)
        });
        col1.appendChild(input);
        row.appendChild(col1)

        // category
        const col2 = document.createElement('td');
        col2.textContent = element;
        row.appendChild(col2);
        tableCat.appendChild(row);
    }

}

addPreferences();


const saveButton = document.getElementById("save");
const selectAllButton = document.getElementById("selectAll");
const deselectAllButton = document.getElementById("deselectAll");

saveButton.addEventListener("click", function () {
    const selectedCategories = {};
    const checkboxes = qsa('input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        // console.log("checkboc", checkbox.name);
        const category = checkbox.name.split(/(\d+)/)
        console.log(userdata, category);
        if (checkbox.checked) {
            userdata[category[0]]['selected'][category[1]] = true;
        } else {
            userdata[category[0]]['selected'][category[1]] = false;
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

    console.log("In the change value function", idFinder)

    if (text.length != 0) {
        // change the value of the html element
        id(idFinder + "value").textContent = text

        // console.log(userdata)

        // change the value of the data
        const x = idFinder.split(/(\d+)/)
        console.log(x)
        // const x = category
        userdata[x[2]][x[1]]['values'][x[3]] = text;

        console.log(userdata)
        writeToFile(userdata, user_filename);

    } else {
        confirm("Please input an alternative")
    }
}

async function writeToFile(data, filename) {
    console.log(data);

    // prepare request
    const request = {
        task: "get-user-data",
        data: data,
        filename: filename
    };

    const template = Ajax.query(request);
    // console.log("Request: " + JSON.stringify(request));

    // upon the return of the request
    template.then(function (object) {
        console.log("Response: " + JSON.stringify(object));

        // rest of the code here

    });


    // const response = await fetch('./database/' + user_filename,
    //     {
    //         method: 'POST',
    //         body: JSON.stringify(data)
    //     })
    //     .then(response => console.log(response.json()))
    //     .then(data => {
    //         console.log("successfully writtent o file")
    //     })
    //     .catch(error => {
    //         console.error(error)
    //     })
    // console.log("made it rhur")
}

// function selectChange(v, el) {
//     if (v == "sources") {

//     } else if (v == "category") {

//     }
// }
// using the user id information. need to build out the profile of the person.
// need a boiler plate user dashboard page. what information to include, and then
// chagne that dynamically using the userid. and the associaed data file.(user-1)

/** Dashborad
 * Incoming insights to carying degrees of speficicity
 *      how specific
 *      there should be more questions here
 * Filter
 * Prvacy selector settings
 * How are the different insights filtered? grouped together?
 * Blocking insihgts from certain companies?
 * Crypto area. Maybe do a tabbed kindof thing where I can see the crypto information?
 *      Or maybe more specific in the tab, less specific in the dashboard - yes
 * typical ads?
 *      an example of an ad that advertisers have selected to also display the ad
 *      selection process.
 *
 *
 */

// I WANT BUTTONS TO TOGGLE CERTAIN SOURCES, and certain categories