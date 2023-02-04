import Ajax from "./ajax.js";
// const path = require('path');

// Helper functions - to ease coding
function id(id) {
    return document.getElementById(id);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

const body = id("profile-selector");

var profile_ids = [];
var buttonElements = []

async function setUp() {
    const response = await fetch('../database/userProfiles.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');

            for (let i = 1; i < lines.length; i++) {
                const el = lines[i].split(", ");
                let name = el[1];
                let id = el[2];
                id = id.replace(/\r/g, "");
                profile_ids.push(id)


                let a = document.createElement('button');
                a.classList += "intro-button"
                let link = "./img/user/" + id + ".jpeg"
                a.innerHTML = '<img src = ' + link + ' alt = ' + name + '>'
                a.id += "user-" + id
                a.addEventListener('click', function () {
                    profileSelected(id);
                })

                body.appendChild(a);
            }
        });

    // setup the button elements
    for (let i = 0; i < profile_ids.length; i++) {
        buttonElements[i] = id("user-" + profile_ids[i])
    }

    console.log("here")

    // window.onload = function () {
    //     console.log("element")

    //     for (let i = 0; i < buttonElements.length; i++) {
    //         const element = buttonElements[i];
    //         console.log(element)
    //         element.addEventListener("click", profileSelected(i));
    //     }
    // }

    // for (let i = 0; i < buttonElements.length; i++) {
    //     const element = buttonElements[i];
    //     element.onlick = profileSelected(i);
    // }

}

function profileSelected(userid) {
    console.log("User profile selected: ", userid);
    window.location.href = "user-page.html?id=" + encodeURIComponent(userid);
}


setUp();


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
