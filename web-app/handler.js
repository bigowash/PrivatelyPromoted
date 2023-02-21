// import { func } from "fast-check";
import help from "./helper.cjs";

const handler = function (obj) {
    const rtnObject = {
        makeitnotempty: true
    };

    const task = obj.task;

    // Each task corresponds to a different function call in the help file.
    // A new options board is always returned, to update the web app page
    if (task === "get-user-data") {
        rtnObject.success = help.getData(obj.data, obj.filename);
    } else if (task === "create-insights") {

        rtnObject.return = help.createInsights(obj.insightID, obj.userProfile);
        console.log(rtnObject.return)
        rtnObject.hlei = "yes"
    } else if (task === "updateFile") {
        rtnObject.return = help.changeFile(obj.data, obj.filename)
    }
    // will always return something
    return rtnObject;
};

export default Object.freeze(handler);
