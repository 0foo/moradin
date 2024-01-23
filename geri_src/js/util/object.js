export function findElementByProperty(obj, propName, propValue) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key][propName] === propValue) {
                return obj[key];
            }
        }
    }
    return null;
}

// this checks if an object is empty
export function isEmpty(obj) {
    // add a check to ensure object
    for (let key in obj) {
        if (this.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};