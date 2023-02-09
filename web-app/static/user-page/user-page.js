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

    const response = await fetch('../database/' + user_filename)
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
            const headerInput = document.createElement('th');
            headerInput.textContent = 'Change';
            headerRow.appendChild(headerInput);
            const headerValidateInput = document.createElement('th');
            headerValidateInput.textContent = 'Submit';
            headerRow.appendChild(headerValidateInput);

            table.appendChild(headerRow);

            // create the body rows based of file info
            keys.forEach(category => {
                // console.log(Array.isArray(data[category]['values']))

                if (Array.isArray(data[category]['values'])) {
                    for (let i = 0; i < data[category]['values'].length; i++) {
                        const tempInfo = {
                            "category": category,
                            'values': data[category]['values'][i],
                            'certainty': data[category]['certainty'][i],
                            'selected': data[category]['selected'][i],
                            'source': data[category]['source'][i]
                        }
                        const dataRow = makeTable(tempInfo, i)
                        table.appendChild(dataRow);
                    }
                } else {
                    const tempInfo = {
                        "category": category,
                        'values': data[category]['values'],
                        'certainty': data[category]['certainty'],
                        'selected': data[category]['selected'],
                        'source': data[category]['source']
                    }
                    const dataRow = makeTable(tempInfo, 1)
                    table.appendChild(dataRow);
                }

            });



        })
}

function makeTable(values, i) {
    const dataRow = document.createElement('tr');

    // check
    const inputSection = document.createElement('td');
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = values['selected'];
    input.setAttribute('name', values["category"] + i);
    input.setAttribute('id', values["category"] + i + 'check');
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
    valueSection.id = values["category"] + i + 'value';
    // console.log(valueSection.textContent)
    dataRow.appendChild(valueSection);

    // certainty
    const certaintySection = document.createElement('td');
    certaintySection.textContent = values["certainty"];
    dataRow.appendChild(certaintySection);

    // source
    const sourceSection = document.createElement('td');
    sourceSection.textContent = values["source"];
    dataRow.appendChild(sourceSection);

    // change 
    const changeSection = document.createElement('td');
    const changeText = document.createElement('input');
    changeText.setAttribute('type', 'text');
    changeText.setAttribute('name', values["category"]);
    changeText.setAttribute('id', values["category"] + i + 'change');
    // changeText.setAttribute('id', values["category"] + '_id');
    changeSection.appendChild(changeText);
    dataRow.appendChild(changeSection);

    // submit button 
    const submitSection = document.createElement('td');
    const submitButton = document.createElement('button');
    submitButton.classList += "submit-button"
    submitButton.setAttribute('id', values["category"] + i + 'button');
    submitButton.addEventListener('click', function () {
        changeValue(values["category"] + i);
    });
    submitSection.appendChild(submitButton);
    dataRow.appendChild(submitSection);


    return dataRow;
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

function changeValue(category) {

    // get the value from the text prompt
    const text = id(category + "change").value;

    if (text.length != 0) {
        // change the value of the html element
        id(category + "value").textContent = text

        // change the value of the data
        const x = category.split(/(\d+)/)
        userdata[x[0]]['values'][x[1]] = text;

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
    console.log("Request: " + JSON.stringify(request));

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


    // // prepare request
    // const request = {
    //     task: "get-user-data",
    // };

    // const template = Ajax.query(request);
    // console.log("Request: " + JSON.stringify(request));

    // // upon the return of the request
    // template.then(function (object) {
    //     console.log("Response: " + JSON.stringify(object));

    //     // rest of the code here

    // });