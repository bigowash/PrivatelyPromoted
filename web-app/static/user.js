import Ajax from "./ajax.js";
// const path = require('path');

// Helper functions - to ease coding
function id(id) {
    return document.getElementById(id);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}
console.log("Here");

const names = [];
const ids = [];
const body = id("body");
console.log(body);

fetch('../database/userProfiles.csv')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        for (let i = 1; i < lines.length; i++) {
            const element = lines[i].split(", ");
            names.push(element[1])
            console.log(names);
        }



        for (let i = 1; i < lines.length; i++) {
            // let blob = new Blob();
            let a = document.createElement('a');
            a.innerHTML = i
        }
    });


// function userSelected() {
//     // update selected profile
//     console.log("User profile selected.");

//     window.location = "./userSelection.html";

//     // // prepare request
//     // const request = {
//     //     task: "select-user",
//     // };

//     // const template = Ajax.query(request);
//     // console.log("Request: " + JSON.stringify(request));

//     // // upon the return of the request
//     // template.then(function (object) {
//     //     console.log("Response: " + JSON.stringify(object));

//     //     window.location = "./userSelection.html";
//     // });
// }

// Equivalent of .onclick = function ()
// (idk why that doesnt seem to work for me but this does)
// window.onload = function () {
//     // option_1.addEventListener("click", singleOption);
//     user_profile.addEventListener("click", userSelected);
// };
