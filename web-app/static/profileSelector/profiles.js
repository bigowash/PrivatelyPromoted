// Helper functions - to ease coding
// This function returns the DOM element with the given ID
const id = function (id) {
    return document.getElementById(id);
};

// Get the container for the buttons
const body = id("profile-selector");

// Initialize arrays for the profile IDs and button elements
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
switch (userType) {
case "insightGenerator":
    dataFile = "../database/insightProfiles.csv";
    nextPage = "../insight-page/insightPage.html";
    subtitle = "Insight Generator";
    imgFile = "insight";
    break;
case "advertiser":
    dataFile = "../database/advProfiles.csv";
    nextPage = "../advertiser-page/advertiser-dashboard.html";
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
    // Fetch the data file and convert it to a text string
    const response = await fetch(dataFile)
        .then((response) => response.text())
        .then(function (data) {
            // Split the data string into an array of lines
            const lines = data.split("\n");

            // Iterate through the array of lines
            for (let i = 1; i < lines.length - 1; i++) {
                // Create an array for each data line, splitting at comma
                const el = lines[i].split(", ");

                // Extract the profile name and ID
                const name = el[1];
                let id = el[2];
                console.log(id);

                // Remove any carriage returns from the ID
                id = id.replace(/\r/g, "");

                // Add the ID to the array of profile IDs
                profileIDs.push(id);
                console.log("el", el);

                // Create a div to hold the button and label
                const container = document.createElement("div");
                container.classList += "button-container";

                // Create a button element
                const button = document.createElement("button");
                button.classList.add("intro-button");
                const link = "../img/" + imgFile + "/" + id + ".jpeg";
                const img = document.createElement("img");
                img.src = link;
                img.alt = name;
                button.id = "user-" + id;
                button.appendChild(img);

                // Create a label element with the profile name
                const label = document.createElement("p");
                label.classList += "profile-label";
                label.innerHTML = name;

                // Add the button and label to the container
                container.appendChild(button);
                container.appendChild(label);

                // Add an event listener to the button
                button.addEventListener("click", function () {
                    profileSelected(id, name);
                });

                body.appendChild(container);
            }
        });

    for (let i = 0; i < profileIDs.length; i++) {
        buttonElements[i] = id(userType + profileIDs[i]);
    }
};

function profileSelected (userid, name) {
    console.log("Profile Selected: ", userid);
    window.location.href =
        nextPage +
        "?id=" +
        encodeURIComponent(userid) +
        "&name=" +
        encodeURIComponent(name);
}

setUp();
