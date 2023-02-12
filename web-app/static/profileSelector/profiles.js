// Helper functions - to ease coding
const id = function (id) {
    return document.getElementById(id);
};

const body = id("profile-selector");

const profileIDs = [];
const buttonElements = [];

// Get the information from the link (what user is selected)
const params = new URLSearchParams(window.location.search);
const userType = params.get("type");
console.log("userType: ", userType);

let dataFile;
let nextPage;
let subtitle;
let imgFile;

// Change the values of various variables, depending on the userType
console.log(userType);

switch (userType) {
case "insightGenerator":
    dataFile = "../database/insightProfiles.csv";
    nextPage = "../insight-page/insightPage.html";
    subtitle = "Insight Generator";
    imgFile = "insight";
    break;
case "advertiser":
    dataFile = "../database/advProfiles.csv";
    nextPage = "../advertiser-page/advPage.html";
    subtitle = "Advertiser";
    imgFile = "advertiser";
    break;
case "user":
    dataFile = "../database/userProfiles.csv";
    nextPage = "../user-page/userPage.html";
    subtitle = "User";
    imgFile = "user";
    break;
case "website":
    dataFile = "../database/webProfiles.csv";
    nextPage = "../web-page/webPage.html";
    subtitle = "Website";
    imgFile = "website";
    break;
default:
    break;
}

// Fill in the text content of the page subtitle with prior variable
id("subtitle").textContent = "Select the " + subtitle + " profile";

// Filling in the content in body
// Creating profile options the user will pick from
const setUp = async function () {
    const response = await fetch(dataFile)
        .then((response) => response.text())
        .then(function (data) {
            // Splitting returned data into an array by line
            const lines = data.split("\n");

            // Iterate through array
            for (let i = 1; i < lines.length - 1; i++) {
                // Create an array for each data line, splitting at comma
                const el = lines[i].split(", ");

                // Extracting name
                const name = el[1];

                // Extracting id
                let id = el[2];
                console.log(id);

                id = id.replace(/\r/g, "");
                profileIDs.push(id);
                console.log("el", el);

                // Setting up buttons
                const a = document.createElement("button");
                a.classList += "intro-button";
                const link = "../img/" + imgFile + "/" + id + ".jpeg";
                a.innerHTML = "<img src = " + link + " alt = " + name + ">";
                a.id += "user-" + id;

                const label = document.createElement("div");
                label.textContent = name;
                label.classList.add("button-label");
                a.appendChild(label);

                a.addEventListener("click", function () {
                    profileSelected(id, name);
                });

                body.appendChild(a);
            }
        });

    // setup the button elements
    for (let i = 0; i < profileIDs.length; i++) {
        buttonElements[i] = id(userType + profileIDs[i]);
    }

    // setup the button elements
    for (let i = 0; i < profileIDs.length; i++) {
        buttonElements[i] = id(userType + profileIDs[i]);
    }
};

function profileSelected(userid, name) {
    console.log("Pofile selected: ", userid);
    window.location.href =
        nextPage +
        "?id=" +
        encodeURIComponent(userid) +
        "&name=" +
        encodeURIComponent(name);
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
