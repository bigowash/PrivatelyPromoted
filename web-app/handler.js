import help from "./helper.cjs";
const handler = async function (obj) {
    const rtnObject = {
        makeitnotempty: true
    };

    const task = obj.task;

    if (task === "get-user-buttons") {
        try {
            const data = await help.getUserButtonFromCSV();
            rtnObject.data = data;
            // console.log(data)
        } catch (error) {
            console.error(error);
        }
    } else if (task === "create-insights") {
        rtnObject.return = help.createInsights(obj.insightID, obj.userProfile);
        // console.log(rtnObject.return)
        rtnObject.hlei = "yes"
    } else if (task === "updateFile") {
        rtnObject.return = help.changeFile(obj.data, obj.filename)
    } else if (task === "makeImpression") {
        const d = await help.generateImpression(obj.website_data)
        rtnObject.image = d[0];
        rtnObject.money = d[1];
        // return rtnObject.adObj
    } else if (task === "generateAd") {
        const d = await help.generateAd(obj.user_data)
        console.log("In the handler file")
        console.log("this is the returned thingy:")
        rtnObject.ad = d;
    } else if (task === "get-user-data") {
        rtnObject.success = help.getData(obj.data, obj.filename);
    } else if (task === "get-user-file") {
        rtnObject.data = await help.getUserDataFromFile(obj.userid);
    }
    // console.log(rtnObject.data)
    return rtnObject;
};


export default Object.freeze(handler);
