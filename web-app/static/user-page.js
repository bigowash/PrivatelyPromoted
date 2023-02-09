// const fs = require('fs');
// const fs = module.constructor._load('fs');
// import fs from './fs'
// import * as fs from 'fs'

// import Ajax from "./ajax.js";

// Helper functions - to ease coding
function id(id) {
    return document.getElementById(id);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

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
            // console.log(data)

            data = JSON.parse(data)
            console.log(data['Age']);

        })
}

console.log("hese")
addPreferences();


const saveButton = document.getElementById("save");

saveButton.addEventListener("click", function () {
    const selectedCategories = {};
    const checkboxes = qsa('input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedCategories[checkbox.name] = true;
        }
    });

    console.log("here");
    console.log(selectedCategories);

    const json = JSON.stringify(selectedCategories);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "selected_categories.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});



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