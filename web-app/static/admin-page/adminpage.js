// Add homepage link to title
const title = document.getElementById("title");
title.addEventListener("click", function () {
    window.location.href = "../";
});

// console.log("In the file")

let body = document.getElementById("ads-list");
let data;
// read from the history file.
const response = await fetch("../database/history.json")
    .then((response) => response.text())
    .then(function (ydata) {
        data = JSON.parse(ydata);
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            const el = data[i];

            // get image:
            const imagelink = el.ad.image;
            console.log("imagelink", imagelink);

            // Create a div to hold the button and label
            const container = document.createElement("div");
            container.classList += "button-container";

            // Create a button element
            const button = document.createElement("button");
            button.classList.add("intro-button");
            const link = "../database/adverts/" + imagelink;
            const img = document.createElement("img");
            button.setAttribute("name", el.ad.advertID)
            img.src = link;
            button.appendChild(img);

            // Create a label element with the profile name
            const label = document.createElement("label");
            label.textContent = el.ad.advertID
            label.setAttribute("for", el.ad.advertID)
            label.classList += "profile-label";

            // Add the button and label to the container
            container.appendChild(button);
            container.appendChild(label);

            // Add an event listener to the button
            button.addEventListener("click", function () {
                adSelected(i);
                console.log("elesected");
            });

            body.appendChild(container);
        }
    });

function adSelected(id) {
    // data[id]
    console.log("Ad Selected: ", id);
    window.location.href =
        "./Ad_selectionDemo.html" + "?id=" + encodeURIComponent(id);
}
