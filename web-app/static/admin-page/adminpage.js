// console.log("In the file")

let body = document.getElementById("ads-list")
let data;
// read from the history file.
const response = await fetch("../database/history.json")
    .then((response) => response.text())
    .then(function (ydata) {
        // Split the data string into an array of lines
        // const lines = data.split("\n");
        // console.log(data)
        data = JSON.parse(ydata)
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            const el = data[i];

            // get image:
            const imagelink = el.ad.image
            console.log("imagelink", imagelink)

            // Create a div to hold the button and label
            const container = document.createElement("div");
            container.classList += "button-container";

            // Create a button element
            const button = document.createElement("button");
            button.classList.add("intro-button");
            const link = "../database/adverts/" + imagelink;
            const img = document.createElement("img");
            img.src = link;
            // img.alt = name;
            // button.id = "user-" + id;
            button.appendChild(img);

            // Create a label element with the profile name
            const label = document.createElement("p");
            label.classList += "profile-label";
            // label.innerHTML = name;

            // Add the button and label to the container
            container.appendChild(button);
            container.appendChild(label);

            // Add an event listener to the button
            button.addEventListener("click", function () {
                adSelected(i);
                console.log("elesected")
            });

            body.appendChild(container);
        }
    });

function adSelected(id) {
    // data[id]
    console.log("Ad Selected: ", id);
    window.location.href = "./Ad_selectionDemo.html" +
        "?id=" +
        encodeURIComponent(id);
}