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
