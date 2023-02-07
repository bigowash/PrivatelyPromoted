import {
    fastButton,
    fastMenu,
    provideFASTDesignSystem
} from "@microsoft/fast-components";

provideFASTDesignSystem().register(fastButton(), fastMenu());

const id = function (value) {
    return document.getElementById(value);
};
