import Ajax from "./ajax.js";
// const path = require('path');

// Helper functions - to ease coding
function id(id) {
    return document.getElementById(id);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

let params = new URLSearchParams(window.location.search);

let userid = params.get("id");

console.log("id: ", userid);