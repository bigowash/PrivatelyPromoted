import Ajax from "./ajax.js";

// Helper functions - to ease coding
function id(id) {
    return document.getElementById(id);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

const userSelected = function () {
    // update selected profile
    console.log("User profile selected.");

    window.location.href = "./profileSelector/profiles.html?type=" + encodeURIComponent("user");
}

const advertiserSelected = function () {
    console.log("Advertiser profile selected");

    // Send to advertiser page
    window.location.href = "./profileSelector/profiles.html?type=" + encodeURIComponent("advertiser");
}

// console.log("User profile selected: ", userid);
// window.location.href = "user-page.html?id=" + encodeURIComponent(userid);

const insightGenSelected = function () {
    console.log("Insight Generator profile selected");

    // Send to advertiser page
    window.location.href = "./profileSelector/profiles.html?type=" + encodeURIComponent("insightGenerator");
    // window.location = "./profileSelector/profiles.html"
}


const websiteSelected = function () {
    console.log("Website profile selected");

    // Send to advertiser page
    window.location.href = "./profileSelector/profiles.html?type=" + encodeURIComponent("website");
    // window.location = "./profileSelector/profiles.html"
}

const adminSelected = function () {
    console.log("Website profile selected");

    // Send to advertiser page
    window.location.href = "./adminPage.html";
}

const user_profile = id("user-selected");
const adv_profile = id("adv-selected");
const insight_profile = id("insight-selected");
const web_profile = id("website-selected");
const admin_profile = id("admin-selected");

window.onload = function () {
    user_profile.addEventListener("click", userSelected);
    insight_profile.addEventListener('click', insightGenSelected);
    adv_profile.addEventListener("click", advertiserSelected);
    web_profile.addEventListener('click', websiteSelected);
    admin_profile.addEventListener('click', adminSelected);
};
