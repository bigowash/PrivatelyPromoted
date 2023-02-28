// Imports
import handler from "./handler.js";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

///
// App setup
///

const port = 8080;
const app = express();

app.use("/", express.static("web-app/static"));

app.use("/", express.json());
app.post("/", async function (req, res) {
    const responseObj = await handler(req.body);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(responseObj));
});

///
// Advert upload
///

// Set up the JSON file path and storage location for uploaded images
const __dirname = path.resolve();
const filePath = path.join(
    __dirname,
    "web-app/static/database/adverts/data.json"
);
const storage = multer.diskStorage({
    destination: "web-app/static/database/adverts/images",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    }
});

const upload = multer({ storage });

// Generate random number for advert id
const generateRandomNumber = function () {
    // Generate a random number between 0 and 999999 (inclusive)
    const randomNumber = Math.floor(Math.random() * 1000000);

    // Convert the number to a 6-digit string by padding with leading zeros
    const sixDigitNumber = randomNumber.toString().padStart(6, "0");

    return sixDigitNumber;
};

// Set up a route to handle form submissions
app.post("/submit-form", upload.single("advert-image"), (req, res) => {
    const { body, file } = req;
    // Extract the required demographic targeting data from the form data
    const required_demographics = {};

    Object.keys(body).forEach((key) => {
        if (key.endsWith("Required_Select")) {
            if (body[key] != "") {
                const newStr = key.slice(0, -15);
                console.log(newStr)
                required_demographics[newStr] = body[key];
            }
        }
    });

    // Extract the recommended demographic targeting data from the form data
    const recommended_demographics = {};

    Object.keys(body).forEach((key) => {
        if (key.endsWith("Recommended_Select")) {
            if (body[key] != "") {
                const newStr = key.slice(0, -18);
                console.log(newStr)
                recommended_demographics[newStr] = body[key];
            }
        }
    });

    // Create an object to store the form data and image path
    const formData = {
        advertiserName: body.profileName,
        advertiserId: body.profileId,
        title: body["advert-title"],
        description: body["advert-description"],
        replacementText: body["ad-replacement-text"],
        image: file ? `/images/${file.filename}` : null,
        totalSpend: body.totalSpend,
        maxSpend: body["max-money-per-ad"],
        requiredTargetedDemographic: required_demographics,
        recommendedTargetedDemographic: recommended_demographics,
        advertTheme: body.themeSelect,
        advertID: generateRandomNumber(),
        numViews: 0, // Placeholder value
        numClickthroughs: 0, // Placeholder value
        viewerDemographics: {} // Demographic data on advert viewers, how closely they match required and recommended demographics
    };

    // Append the form data to the JSON file
    fs.readFile(filePath, "utf8", (err, data) => {
        // Push to JSONs
        const jsonData = JSON.parse(data);
        jsonData.push(formData);

        // Update JSON file
        fs.writeFile(filePath, JSON.stringify(jsonData), "utf8", (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Server error");
            }
        });

        // Handle error
        if (err) {
            console.error(err);
            res.redirect(
                "./advertiser-page/advertiser-dashboard.html" +
                "?id=" +
                encodeURIComponent(body.profileId) +
                "&name=" +
                encodeURIComponent(body.profileName) +
                "&error=" +
                encodeURIComponent(1)
            );
        } else {
            res.redirect(
                "./advertiser-page/advertiser-dashboard.html" +
                "?id=" +
                encodeURIComponent(body.profileId) +
                "&name=" +
                encodeURIComponent(body.profileName) +
                "&error=" +
                encodeURIComponent(0)
            );
        }
    });
});

///
// Serve Web App
///

app.listen(port, function () {
    console.log(`Listening on port ${port} – http://localhost:${port}`);
});
