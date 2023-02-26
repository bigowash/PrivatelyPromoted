// import path from "path";

///
// Add profile information to form
///

// Get the information from the link (what user is selected)
const urlParams = new URLSearchParams(window.location.search);
const profileName = urlParams.get("name");
const profilegetID = urlParams.get("id");

console.log("Profile Name: ", profileName);
console.log("Profile getID: ", profilegetID);

///
// Add link to homepage
///

const title = document.getElementById("title");
title.addEventListener("click", function () {
    window.location.href = "../../";
});

///
// Get data
///

// Get elements
const tableElement = document.getElementById("advTable");

// Build table body
const getAdverts = async function () {
    console.log("Getting advert data");

    // Fetch data
    const response = await fetch("../../database/adverts/data.json")
        .then((response) => response.json())
        .then(function (data) {
            // Debug message
            console.log("Data received");

            // Initialise table
            const tableHead = document.createElement("thead");
            tableHead.classList.add("tableHead");

            const tableHeadRow = document.createElement("tr");
            tableHeadRow.classList.add("headerRow");

            const headerAdId = document.createElement("th");
            headerAdId.textContent = "ID";
            headerAdId.classList.add("headerCell");
            tableHeadRow.appendChild(headerAdId);

            const headerName = document.createElement("th");
            headerName.textContent = "Title";
            headerName.classList.add("headerCell");
            tableHeadRow.appendChild(headerName);

            const headerDesc = document.createElement("th");
            headerDesc.textContent = "Description";
            headerDesc.classList.add("headerCell");
            tableHeadRow.appendChild(headerDesc);

            const headerImg = document.createElement("th");
            headerImg.textContent = "Image";
            headerImg.classList.add("headerCell");
            tableHeadRow.appendChild(headerImg);

            const headerReqInsights = document.createElement("th");
            headerReqInsights.textContent = "Required Features";
            headerReqInsights.classList.add("headerCell");
            tableHeadRow.appendChild(headerReqInsights);

            const headerRecInsights = document.createElement("th");
            headerRecInsights.textContent = "Recommended Features";
            headerRecInsights.classList.add("headerCell");
            tableHeadRow.appendChild(headerRecInsights);

            const headerNumViews = document.createElement("th");
            headerNumViews.textContent = "Number of Advert Views";
            headerNumViews.classList.add("headerCell");
            headerNumViews.classList.add("numViews");
            tableHeadRow.appendChild(headerNumViews);

            const headerNumClicks = document.createElement("th");
            headerNumClicks.textContent = "Number of Advert Clicks";
            headerNumClicks.classList.add("headerCell");
            headerNumClicks.classList.add("numClicks");
            tableHeadRow.appendChild(headerNumClicks);

            tableHead.appendChild(tableHeadRow);
            tableElement.appendChild(tableHead);

            // Create table body
            const tableBody = document.createElement("tbody");

            // Iterate over data.json array
            data.forEach(function (advObj) {
                // Check if the advObj is for the correct advertiser profile
                if (advObj.advertiserName === profileName) {
                    // Create table row
                    const bodyRow = document.createElement("tr");

                    // Create ad ID element
                    const adId = document.createElement("th");
                    adId.textContent = advObj.advertID;
                    adId.classList.add("bodyCell");
                    adId.classList.add("adId");
                    bodyRow.appendChild(adId);

                    // Create ad title element
                    const adTitle = document.createElement("th");
                    adTitle.textContent = advObj.title;
                    adTitle.classList.add("bodyCell");
                    adTitle.classList.add("title");
                    bodyRow.appendChild(adTitle);

                    // Create ad description element
                    const adDesc = document.createElement("th");
                    adDesc.textContent = advObj.description;
                    adDesc.classList.add("bodyCell");
                    adDesc.classList.add("adDesc");
                    bodyRow.appendChild(adDesc);

                    // Create ad image preview element
                    const adImg = document.createElement("th");
                    // Check if an image file was uploaded
                    if (advObj.image !== null) {
                        const imgElement = document.createElement("img");
                        console.log(
                            "Image Path:" + "database/adverts" + advObj.image
                        );
                        imgElement.src = encodeURI(
                            "../../database/adverts" + advObj.image
                        );
                        adImg.appendChild(imgElement);
                    } else {
                        adImg.textContent = "Advert image was not provided";
                    }
                    adImg.classList.add("bodyCell");
                    adImg.classList.add("image");
                    bodyRow.appendChild(adImg);

                    // Create required features element
                    const reqFeat = document.createElement("th");
                    reqFeat.classList.add("bodyCell");
                    reqFeat.classList.add("reqFeat");

                    const reqTable = document.createElement("table");
                    Object.entries(advObj.requiredTargetedDemographic).forEach(
                        ([key, value]) => {
                            const tr = document.createElement("tr");
                            tr.classList.add("subTableRow");
                            const tdKey = document.createElement("td");
                            tdKey.classList.add("subTableKeyCell");
                            const tdValue = document.createElement("td");
                            tdValue.classList.add("subtableValueCell");
                            tdKey.textContent = key;
                            tdValue.textContent = value;
                            tr.appendChild(tdKey);
                            tr.appendChild(tdValue);
                            reqTable.appendChild(tr);
                        }
                    );
                    reqFeat.appendChild(reqTable);
                    bodyRow.appendChild(reqFeat);

                    // Create recommended features element
                    const recFeat = document.createElement("th");
                    recFeat.classList.add("bodyCell");
                    recFeat.classList.add("recFeat");

                    const recTable = document.createElement("table");
                    Object.entries(advObj.recommendedTargetedDemographic).forEach(
                        ([key, value]) => {
                            const tr = document.createElement("tr");
                            tr.classList.add("subTableRow");
                            const tdKey = document.createElement("td");
                            tdKey.classList.add("subTableKeyCell");
                            const tdValue = document.createElement("td");
                            tdValue.classList.add("subtableValueCell");
                            tdKey.textContent = key;
                            tdValue.textContent = value;
                            tr.appendChild(tdKey);
                            tr.appendChild(tdValue);
                            recTable.appendChild(tr);
                        }
                    );
                    recFeat.appendChild(recTable);
                    bodyRow.appendChild(recFeat);

                    // Create number of views element
                    const numViews = document.createElement("th");
                    numViews.textContent = advObj.numViews;
                    numViews.classList.add("bodyCell");
                    numViews.classList.add("numViews");
                    bodyRow.appendChild(numViews);

                    // Create number of click throughs element
                    const numClicks = document.createElement("th");
                    numClicks.textContent = advObj.numClickthroughs;
                    numClicks.classList.add("bodyCell");
                    numClicks.classList.add("numClicks");
                    bodyRow.appendChild(numClicks);

                    // Append table row to table body
                    tableBody.appendChild(bodyRow);
                }
            });
            // Append table body to table element
            tableElement.appendChild(tableBody);
        });
};

// Run build function
getAdverts();
