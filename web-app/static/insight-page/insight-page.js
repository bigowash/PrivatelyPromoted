import Ajax from "../ajax.js";
const button = document.getElementById("button_trial");
const input = document.getElementById("userProfile-input")

// Get the information from the link (what user is selected)
let params = new URLSearchParams(window.location.search);
let name = params.get("name");

button.addEventListener("click", function () {
    console.log("BUtton Clicked");

    console.log(input)
    const userid = input.value

    // prepare request
    const request = {
        task: "create-insights",
        insightID: name,
        userProfile: userid
    };

    const template = Ajax.query(request);
    console.log("Request: " + JSON.stringify(request));

    // upon the return of the request
    template.then(function (object) {
        console.log("Response: " + JSON.stringify(object));

        // rest of the code here

    });
});