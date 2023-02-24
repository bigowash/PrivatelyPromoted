const params = new URLSearchParams(window.location.search);
const ad_id = params.get("id");

let total;

// read from the history file.
const response = await fetch("../database/history.json")
    .then((response) => response.text())
    .then(function (data) {
        data = JSON.parse(data)
        total = data[ad_id]
        console.log(total)

        // fill up the parts
        // part 1 -- the total insights for the user
        let box1 = document.getElementById("p1")

        const listEl = document.createElement("ul")

        for (const [key, value] of Object.entries(total.userdata)) {
            // Create a new list item element for each pair

            // Set the text content of the list item to the key:value pair
            // console.log("ehkfslfd")
            for (let i = 0; i < value[0].values.length; i++) {
                const element = value[0].values[i];

                const listItemElement = document.createElement("li");
                listItemElement.textContent = `${key}: ${element}`;
                listEl.appendChild(listItemElement);
            }

            // Add the list item to the unordered list
        }
        box1.appendChild(listEl)

        // part 2 -- the selected insights
        let box2 = document.getElementById("p2")

        const listEl2 = document.createElement("ul")

        for (const [key, value] of Object.entries(total.userdata)) {
            // Create a new list item element for each pair

            // Set the text content of the list item to the key:value pair
            // console.log("ehkfslfd")
            for (let i = 0; i < value[0].values.length; i++) {

                const element = value[0].values[i];

                if (!value[0].selected[i]) {
                    continue;
                }

                const listItemElement = document.createElement("li");
                listItemElement.textContent = `${key}: ${element}`;
                listEl2.appendChild(listItemElement);
            }

            // Add the list item to the unordered list
        }
        box2.appendChild(listEl2)

        // part 3 -- the website data
        let box3 = document.getElementById("p3")
        console.log(total.website)

        const website_name = document.createElement("h3");
        website_name.textContent = total.website.name;
        box3.appendChild(website_name)

        const listEl3 = document.createElement("ul")

        for (let i = 0; i < total.website.selectedThemes.length; i++) {
            const themese = total.website.selectedThemes[i];

            const listItemElement = document.createElement("li");
            listItemElement.textContent = themese;
            listEl3.appendChild(listItemElement);
        }

        // Add the list item to the unordered list
        box3.appendChild(listEl3)

        // part 4 -- 3 advertismeents include the one selected
        let box4 = document.getElementById("p4")

        // get 2 random advertisemnets
        const res = fetch("../database/adverts/data.json")
            .then((res) => res.text())
            .then(function (yda) {
                yda = JSON.parse(yda)

                // Get 2 random elements from the list
                const randomElements = [];
                randomElements.push(total.ad)
                while (randomElements.length < 3) {
                    const randomIndex = Math.floor(Math.random() * yda.length);
                    const randomElement = yda[randomIndex];
                    if (!randomElements.includes(randomElement)) {
                        randomElements.push(randomElement);
                    }
                }

                for (let i = 0; i < randomElements.length; i++) {
                    const addd = randomElements[i];
                    // for every add, add to the box relevant information. required pref and reccomended prefs.
                    const tempReq = Object.entries(addd.requiredTargetedDemographic);
                    const tempRec = Object.entries(addd.recommendedTargetedDemographic);

                    const ad_num = document.createElement("h3")
                    ad_num.textContent = "Advertisement: " + (i + 1).toString()
                    box4.appendChild(ad_num)

                    const head = document.createElement("h4")
                    head.textContent = "Required Preferences"
                    box4.appendChild(head)

                    const ul1 = document.createElement("ul")
                    for (let j = 0; j < tempReq.length; j++) {
                        const element = tempReq[j];
                        const li = document.createElement("li")
                        li.textContent = element[0] + ": " + element[1]
                        ul1.appendChild(li)
                    }
                    box4.appendChild(ul1)

                    const head3 = document.createElement("h4")
                    head3.textContent = "Reccomended Preferences"
                    box4.appendChild(head3)

                    const ul2 = document.createElement("ul")
                    for (let j = 0; j < tempRec.length; j++) {
                        const element = tempRec[j];
                        const li = document.createElement("li")
                        li.textContent = element[0] + ": " + element[1]
                        ul2.appendChild(li)
                    }
                    box4.appendChild(ul2)

                }

                // part 5 -- the final selection
                let box5 = document.getElementById("p5")

                const ul4 = document.createElement("ul")
                for (const [key, value] of Object.entries(total.ad)) {
                    const li32 = document.createElement("li")

                    li32.textContent = `${key} : ${value}`
                    ul4.appendChild(li32)

                    // Add the list item to the unordered list
                }
                box5.appendChild(ul4)
                const img = document.createElement("img");
                img.src = "../database/adverts/" + total.ad.image;
                box5.appendChild(img)
            })
    })

