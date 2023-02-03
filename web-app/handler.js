import { func } from "fast-check";
import help from "./solving_functions.js";

//this will store a log of all codes entered (like a simple database)
const codeHistory = [];

var hyp_number;
var hyp_row;
var hyp_col;

const handler = function (obj) {
    const rtnObject = {
        makeitnotempty: true,
    };

    const task = obj.task;
    let options;
    let sudoku_string;

    // Each task corresponds to a different function call in the help file.
    // A new options board is always returned, to update the web app page
    if (task === "get_board") {
        rtnObject.get_board = true;
        sudoku_string = obj.sudoku_string;
        rtnObject.options = help.init(sudoku_string);
    } else if (task === "isValid") {
        rtnObject.isValid = true;
        sudoku_string = obj.sudoku_string;
        rtnObject.answer = help.isvalid(sudoku_string);
    } else if (task === "exhaustive_options") {
        rtnObject.exhaustive_options = true;
        options = obj.options;
        rtnObject.options = help.get_exhaustive_options(options);
    } else if (task === "single_option") {
        rtnObject.single_option = true;
        options = obj.options;
        rtnObject.options = help.simple(options);
    } else if (task === "obviousPairs") {
        rtnObject.obviousPairs = true;
        options = obj.options;
        rtnObject.options = help.two_pairs(options);
    } else if (task === "obviousTriplets") {
        rtnObject.obviousTriplets = true;
        options = obj.options;
        rtnObject.options = help.three_pairs(options);
    } else if (task === "nakedPairs") {
        rtnObject.nakedPairs = true;
        options = obj.options;
        rtnObject.options = help.two_naked(options);
    } else if (task === "nakedTriplets") {
        rtnObject.nakedTriplets = true;
        options = obj.options;
        rtnObject.options = help.three_naked(options);
    } else if (task === "removeFromLine") {
        rtnObject.removeFromLine = true;
        options = obj.options;
        rtnObject.options = help.cant_be_on_line(options);
    } else if (task === "hypothesis") {
        rtnObject.hypothesis = true;
        hyp_number = obj.hyp_number;
        hyp_row = obj.hyp_row;
        hyp_col = obj.hyp_col;
        options = obj.options;
        const answer = help.hypothesis(options, hyp_number, hyp_row, hyp_col);
        rtnObject.options = answer.options;
        if (!answer.changed) {
            rtnObject.changed = false;
            rtnObject.reason = answer.reason;
        } else {
            rtnObject.changed = true;
        }
    } else if (task === "undo_hyp") {
        rtnObject.undo_hyp = true;
        hyp_number = obj.hyp_number;
        hyp_row = obj.hyp_row;
        hyp_col = obj.hyp_col;
        options = obj.options;
        rtnObject.options = help.hypothesis_undo(
            options,
            hyp_number,
            hyp_row,
            hyp_col
        );
    }

    // will always return something
    return rtnObject;
};

export default Object.freeze(handler);
