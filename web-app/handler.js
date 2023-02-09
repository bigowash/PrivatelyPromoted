import { func } from "fast-check";
// import help from "./solving_functions.js";
// const fs = require('fs')


const handler = function (obj) {
    const rtnObject = {
        makeitnotempty: true,
    };

    const task = obj.task;

    // Each task corresponds to a different function call in the help file.
    // A new options board is always returned, to update the web app page
    if (task === "get-user-data") {
        console.log("heres")

        // console.log(help.getdata())
    }
    // else if (task === "undo_hyp") {
    //     rtnObject.undo_hyp = true;
    //     hyp_number = obj.hyp_number;
    //     hyp_row = obj.hyp_row;
    //     hyp_col = obj.hyp_col;
    //     options = obj.options;
    //     rtnObject.options = help.hypothesis_undo(
    //         options,
    //         hyp_number,
    //         hyp_row,
    //         hyp_col
    //     );
    // }

    // will always return something
    return rtnObject;
};

export default Object.freeze(handler);
