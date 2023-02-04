import Ajax from "./ajax.js";

// Helper functions - to ease coding
function id(id) {
    return document.getElementById(id);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

function singleOption() {
    // update stats
    solving.push("singleOption()");
    console.log(++clicks);

    // prepare request
    const request = {
        task: "single_option",
        options: options,
    };

    const template = Ajax.query(request);
    console.log("Request: " + JSON.stringify(request));

    template.then(function (object) {
        console.log("Response: " + JSON.stringify(object));

        // if the function actually changed something, change the onscreen board
        if (JSON.stringify(options) != JSON.stringify(object.options)) {
            options = object.options;
            update_board(false);
        }
    });
}

function userSelected() {
    // update selected profile
    console.log("User profile selected.");

    window.location = "./userSelection.html";

    // // prepare request
    // const request = {
    //     task: "select-user",
    // };

    // const template = Ajax.query(request);
    // console.log("Request: " + JSON.stringify(request));

    // // upon the return of the request
    // template.then(function (object) {
    //     console.log("Response: " + JSON.stringify(object));

    //     window.location = "./userSelection.html";
    // });
}

// Get the button elements
// const option_1 = id("option-1");
const user_profile = id("user-selected");
const adv_profile = id("adv-selected");
const web_profile = id("website-selected");
const admin_profile = id("admin-selected");

// Equivalent of .onclick = function ()
// (idk why that doesnt seem to work for me but this does)
window.onload = function () {
    // option_1.addEventListener("click", singleOption);
    user_profile.addEventListener("click", userSelected);
};
