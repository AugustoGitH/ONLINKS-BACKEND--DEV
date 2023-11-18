"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractModelProperties = (objectToExtract, propertiesToExtract) => {
    const extractObjectProperties = (obj) => {
        const extractedObject = {};
        for (const key in obj) {
            if (propertiesToExtract.includes(key)) {
                extractedObject[key] = obj[key];
            }
        }
        return extractedObject;
    };
    if (Array.isArray(objectToExtract)) {
        return objectToExtract.map(extractObjectProperties);
    }
    else {
        return extractObjectProperties(objectToExtract);
    }
};
exports.default = extractModelProperties;
