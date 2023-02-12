// Helper functions

const getID = function (value) {
    return document.getElementById(value);
};

// Get the information from the link (what user is selected)
const urlParams = new URLSearchParams(window.location.search);
const profileName = urlParams.get("name");
const profilegetID = urlParams.get("id");

console.log("Profile Name: ", profileName);
console.log("Profile getID: ", profilegetID);

// Customise subtitle text
const subtitle = getID("subtitle");
subtitle.textContent = `Welcome back ${profileName}, please select from the following options:`;

// Add links to buttons
const new_adv_button = getID("new-adv-button");
const manage_adv_button = getID("manage-adv-button");

new_adv_button.onclick = function () {
    // Debug Statement
    console.log("Create new advert selected");

    // Send to new-advert page
    window.location.href =
        "./new-advert/new-advert.html" +
        "?id=" +
        encodeURIComponent(profilegetID) +
        "&name=" +
        encodeURIComponent(profileName);
};

manage_adv_button.onclick = function () {
    // Debug Statement
    console.log("Manage existing adverts selected");

    // Send to manage-existing-adverts page
    window.location.href =
        "./manage-existing-adverts/manage-adverts.html" +
        "?id=" +
        encodeURIComponent(profilegetID) +
        "&name=" +
        encodeURIComponent(profileName);
};
