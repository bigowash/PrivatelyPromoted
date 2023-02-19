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
app.post("/", function (req, res) {
    const responseObj = handler(req.body);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(responseObj));
});

///
// Advert upload
///

// Set up the JSON file path and storage location for uploaded images
const __dirname = path.resolve();
const filePath = path.join(__dirname, "web-app/static/database/adverts/data.json");
const storage = multer.diskStorage({
    destination: "web-app/static/database/adverts/images",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    }
});
const upload = multer({ storage: storage });

// Serve static files from the 'static' folder
app.use(express.static("static"));

// Set up a route to handle form submissions
app.post("/submit-form", upload.single("advert-image"), (req, res) => {
    const { body, file } = req;

    // Create an object to store the form data and image path
    const formData = {
        title: body["advert-title"],
        description: body["advert-description"],
        replacementText: body["ad-replacement-text"],
        image: file ? `/images/${file.filename}` : null,
        numTimesShown: body["numberTimesShown"],
        maxSpend: body["max-money-per-ad"],
        demographics: body["targetingWrapper"]
    };

    // Append the form data to the JSON file
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Server error");
        }

        const jsonData = JSON.parse(data);
        jsonData.push(formData);

        fs.writeFile(filePath, JSON.stringify(jsonData), "utf8", (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Server error");
            }

            res.send("Form submitted successfully!");
        });
    });
});

app.listen(port, function () {
    console.log(`Listening on port ${port} – http://localhost:${port}`);
});
