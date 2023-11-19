"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkRepeatedItemsInAnArray = (items) => {
    const countMap = {};
    const duplicateItems = [];
    items.forEach((item) => {
        countMap[item] = (countMap[item] || 0) + 1;
    });
    for (const [key, value] of Object.entries(countMap)) {
        if (value > 1) {
            duplicateItems.push(key);
        }
    }
    return duplicateItems;
};
exports.default = checkRepeatedItemsInAnArray;
