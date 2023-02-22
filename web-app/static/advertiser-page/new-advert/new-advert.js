///
// Add profile information to form
///

// Get the information from the link (what user is selected)
const urlParams = new URLSearchParams(window.location.search);
const profileName = urlParams.get("name");
const profilegetID = urlParams.get("id");

console.log("Profile Name: ", profileName);
console.log("Profile getID: ", profilegetID);

// Add profile info
const profileNameInput = document.getElementById("profileName");
profileNameInput.value = profileName;

const profileIdInput = document.getElementById("profileId");
profileIdInput.value = profilegetID;

///
// File upload button functionality
///

// Getting elements by class
const fileInput = document.querySelector(".file-input");
const fileInputName = document.querySelector(".file-input-name");
const fileInputWrapper = document.querySelector(".file-input-wrapper");

fileInput.addEventListener("change", (event) => {
    const fileName = event.target.value.split("\\").pop();
    if (fileName) {
        fileInputName.textContent = fileName;
        fileInputWrapper.classList.add("has-file");
    } else {
        fileInputName.textContent = "";
        fileInputWrapper.classList.remove("has-file");
    }
});

///
// Required Targeting
///

// Get elements
const requiredTargetWrapper = document.getElementById("requiredTargetWrapper");

// Get the json data
async function addRequiredDropDown () {
    console.log("fetching insight options");

    // response
    const response = await fetch("../../database/preferences.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate over the json keys and create a dropdown for each one
            Object.keys(data).forEach((key) => {
                // Create parent div
                const parentDiv = document.createElement("div");

                // Add class to parent div
                parentDiv.classList.add("select");

                // Create a new select element
                const select = document.createElement("select");

                // Add class to select element
                select.classList.add("selectElement");

                // Add a specific id to the select element
                select.setAttribute("id", String(key + "Required_Select"));

                // Add a specific name to the select element
                select.setAttribute("name", String(key + "Required_Select"));

                // Add onchance function to select
                select.setAttribute("onchange", "updateValueInsights()");

                // Create the first option for the dropdown with the key name
                const firstOption = document.createElement("option");
                firstOption.classList.add("dropDownOption");
                firstOption.classList.add("firstOption");
                firstOption.value = "";
                firstOption.text = key;
                select.appendChild(firstOption);

                // Iterate over the json values and add them as options to the dropdown
                data[key].forEach((value) => {
                    const option = document.createElement("option");
                    option.classList.add("dropDownOption");
                    option.value = value;
                    option.text = value;
                    select.appendChild(option);
                });

                // Add dropdown to parent div
                parentDiv.appendChild(select);

                // Add the parent div to the page
                requiredTargetWrapper.appendChild(parentDiv);
            });
        });
}

// Activate function
addRequiredDropDown().then(() => {
    // Add class .selected if select element is changed from default option
    const selectElements = document.querySelectorAll(".selectElement");

    selectElements.forEach((selectElement) => {
        selectElement.addEventListener("change", () => {
            if (selectElement.value === "") {
                selectElement.classList.remove("selected");
            } else if (selectElement.value !== "") {
                selectElement.classList.add("selected");
            }
        });
    });

    // Function that will be run on upload
    const updateValueInsights = function () {
        const selectedValue = document.getElementById("mySelect").value;
        document.getElementById("selectedValue").innerHTML = selectedValue;
    };
});

///
// Recommended Targeting
///

// Get elements
const recommendedTargetWrapper = document.getElementById("recommendedTargetWrapper");

// Get the json data
async function addRecommendedDropDown () {
    console.log("fetching insight options");

    // response
    const response = await fetch("../../database/preferences.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate over the json keys and create a dropdown for each one
            Object.keys(data).forEach((key) => {
                // Create parent div
                const parentDiv = document.createElement("div");

                // Add class to parent div
                parentDiv.classList.add("select");

                // Create a new select element
                const select = document.createElement("select");

                // Add class to select element
                select.classList.add("selectElement");

                // Add a specific id to the select element
                select.setAttribute("id", String(key + "Recommended_Select"));

                // Add a specific name to the select element
                select.setAttribute("name", String(key + "Recommended_Select"));

                // Add onchance function to select
                select.setAttribute("onchange", "updateValueInsights()");

                // Create the first option for the dropdown with the key name
                const firstOption = document.createElement("option");
                firstOption.classList.add("dropDownOption");
                firstOption.classList.add("firstOption");
                firstOption.value = "";
                firstOption.text = key;
                select.appendChild(firstOption);

                // Iterate over the json values and add them as options to the dropdown
                data[key].forEach((value) => {
                    const option = document.createElement("option");
                    option.classList.add("dropDownOption");
                    option.value = value;
                    option.text = value;
                    select.appendChild(option);
                });

                // Add dropdown to parent div
                parentDiv.appendChild(select);

                // Add the parent div to the page
                recommendedTargetWrapper.appendChild(parentDiv);
            });
        });
}

// Activate function
addRecommendedDropDown().then(() => {
    // Add class .selected if select element is changed from default option
    const selectElements = document.querySelectorAll(".selectElement");

    selectElements.forEach((selectElement) => {
        selectElement.addEventListener("change", () => {
            if (selectElement.value === "") {
                selectElement.classList.remove("selected");
            } else if (selectElement.value !== "") {
                selectElement.classList.add("selected");
            }
        });
    });

    // Function that will be run on upload
    const updateValueInsights = function () {
        const selectedValue = document.getElementById("mySelect").value;
        document.getElementById("selectedValue").innerHTML = selectedValue;
    };
});

///
// Create select for advert theme selection
///

const themeWrapper = document.getElementById("advert-theme-select-wrapper");

// Generate select
const addCompanyTheme = async function () {
    // Debug message
    console.log("Fetching company theme data");

    // Fetch Data
    const response = await fetch("../../database/companyThemes.json")
        .then((response) => response.json())
        .then((data) => {
            // Create parent div
            const parentDiv = document.createElement("div");

            // Add class to parent div
            parentDiv.classList.add("select");

            // Create a new select element
            const select = document.createElement("select");

            // Add identifiers to select selement
            select.classList.add("selectElement");
            select.setAttribute("id", "themeSelect");
            select.setAttribute("name", "themeSelect");

            // Add onchance function to select element
            select.setAttribute("onchange", "updateValueTheme()");

            // Create the first option for the dropdown with the key name
            const firstOption = document.createElement("option");
            firstOption.classList.add("dropDownOption");
            firstOption.classList.add("firstOption");
            firstOption.value = "";
            firstOption.text = "Select Corporate Sector of Advert";
            select.appendChild(firstOption);

            // Iterate over the json values and add them as options to the dropdown
            data.forEach(function (value) {
                const option = document.createElement("option");
                option.classList.add("dropDownOption");
                option.value = value;
                option.text = value;
                select.appendChild(option);
            });

            // Add dropdown to parent div
            parentDiv.appendChild(select);

            // Add the parent div to the page
            themeWrapper.appendChild(parentDiv);
        });
};

// Activate function
addCompanyTheme().then(() => {
    // Add class .selected if select element is changed from default option
    const selectElements = document.querySelectorAll(".selectElement");

    selectElements.forEach((selectElement) => {
        selectElement.addEventListener("change", () => {
            if (selectElement.value === "") {
                selectElement.classList.remove("selected");
            } else if (selectElement.value !== "") {
                selectElement.classList.add("selected");
            }
        });
    });

    // Function that will be run on upload
    const updateValueTheme = function () {
        const selectedValue = document.getElementById("mySelect").value;
        document.getElementById("selectedValue").innerHTML = selectedValue;
    };
});
