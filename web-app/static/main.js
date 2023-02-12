// import Ajax from "./ajax.js";

// Helper functions - to ease coding
const id = function (id) {
    return document.getElementById(id);
};

// const qsa = function (selector) {
//     return document.querySelectorAll(selector);
// };

// Page Selection

const userSelected = function () {
    console.log("User profile selected.");

    // Send to page
    window.location.href =
        "./profileSelector/profiles.html?type=" + encodeURIComponent("user");
};

const advertiserSelected = function () {
    console.log("Advertiser profile selected");

    // Send to page
    window.location.href =
        "./profileSelector/profiles.html?type=" + encodeURIComponent("advertiser");
};

const insightGenSelected = function () {
    console.log("Insight Generator profile selected");

    // Send to page
    window.location.href =
        "./profileSelector/profiles.html?type=" + encodeURIComponent("insightGenerator");
};

const websiteSelected = function () {
    console.log("Website profile selected");

    // Send to page
    window.location.href =
        "./profileSelector/profiles.html?type=" + encodeURIComponent("website");
};

const adminSelected = function () {
    console.log("Website profile selected");

    // Send to page
    window.location.href = "./adminPage.html";
};

// Get button elements by id
const user_profile = id("user-selected");
const adv_profile = id("adv-selected");
const insight_profile = id("insight-selected");
const web_profile = id("website-selected");
const admin_profile = id("admin-selected");

// Add event listeners
window.onload = function () {
    user_profile.addEventListener("click", userSelected);
    insight_profile.addEventListener("click", insightGenSelected);
    adv_profile.addEventListener("click", advertiserSelected);
    web_profile.addEventListener("click", websiteSelected);
    admin_profile.addEventListener("click", adminSelected);
};
