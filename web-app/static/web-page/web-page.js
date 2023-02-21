import Ajax from "../ajax.js";
const button = document.getElementById("button_traffic");

// Get the information from the link (what user is selected)
const params = new URLSearchParams(window.location.search);
const name = params.get("name");

const header = document.getElementById("header_name");
header.textContent = name;
const tableTheme = document.getElementById("theme-table");
const saveButton = document.getElementById("save-button");
const filename = name + ".json"

let website_data;

async function loadPage() {
    console.log("Loading the page");

    const response = await fetch("../database/websites/" + filename)
        .then((response) => response.text())
        .then((data) => {
            // data from file
            website_data = JSON.parse(data);
            console.log(website_data);

            const themes = website_data.themes
            console.log(themes);


            // Create the header row
            const headerRow = document.createElement("tr");
            const headerCheck = document.createElement("th");
            headerCheck.textContent = "Include";
            headerRow.appendChild(headerCheck);
            const headerVal = document.createElement("th");
            headerVal.textContent = "Theme";
            headerRow.appendChild(headerVal);

            tableTheme.appendChild(headerRow);

            themes.forEach(el => {
                console.log(el)

                const dataRow = document.createElement("tr");

                // check
                const inputSection = document.createElement("td");
                const input = document.createElement("input");
                input.setAttribute("type", "checkbox");
                if (website_data.selectedThemes.includes(el)) {
                    input.checked = true;
                } else {
                    input.checked = false;
                }

                input.setAttribute("name", el);
                input.setAttribute("id", el + "check");
                inputSection.appendChild(input);
                dataRow.appendChild(inputSection);

                // category
                // console.log("adding cat", values["category"])
                const catSection = document.createElement("td");
                catSection.textContent = el;
                dataRow.appendChild(catSection);

                tableTheme.appendChild(dataRow);

            });

        });
}

saveButton.addEventListener("click", function () {
    // const selectedCategories = {};
    const checkboxes = document.querySelectorAll("input[type=\"checkbox\"]");
    // console.log(checkboxes)

    const listThemes = [];

    checkboxes.forEach(function (checkbox) {
        // console.log("checkboc", checkbox.name);
        const category = checkbox.name;
        // console.log(category)

        // console.log(userdata[category[2]][category[1]].selected);
        if (checkbox.checked) {
            listThemes.push(category)
        }
    });

    website_data.selectedThemes = listThemes
    // console.log(listThemes)

    writeToFile(website_data, filename);
});

async function writeToFile(data, filename) {
    // console.log(data);

    // prepare request
    const request = {
        task: "updateFile",
        data,
        filename
    };

    const template = Ajax.query(request);
    // console.log("Request: " + JSON.stringify(request));

    // upon the return of the request
    template.then(function (object) {
        console.log("Response: " + JSON.stringify(object));

        // rest of the code here
    });

}

button.addEventListener("click", function () {
    // console.log("ere")

})

loadPage();