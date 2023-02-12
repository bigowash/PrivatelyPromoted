// Imports
// import {
//     fastButton,
//     fastCard,
//     provideFASTDesignSystem
// } from "@microsoft/fast-components";

// provideFASTDesignSystem()
//     .register(
//         fastButton(),
//         fastCard()
//     );

// Helper functions

const id = function (value) {
    return document.getElementById(value);
};

// Customise subtitle text
const subtitle = id("subtitle");
subtitle.textContent =
    "Welcome back to Privately Protected Google, please select from the following options.";

// Link to homepage
id("header").onclick(function () {
    window.location.href = "../index.html";
});

console.log("script is working");
