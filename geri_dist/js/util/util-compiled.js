export function generateRandomHash(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
export function capitalizeFirstLetter(in_string) {
    return in_string.charAt(0).toUpperCase() + in_string.slice(1);
};

// if the string equals null or n/a (case insensitive) it will return the value passed.
// note: this could be generalized more with an array of values passed in
export function returnIfNotPresent(in_string, fallbackValue) {
    the_text = in_string.valueOf()
    if (the_text.toUpperCase() === "NULL" || the_text.toUpperCase() === "N/A") {
        return fallbackValue
    }
    return in_string
};

export function trimChar(in_string, charToRemove) {
    const regExp = new RegExp(`^${charToRemove}+|${charToRemove}+$`, 'g');
    return in_string.replace(regExp, '');
};

// removes characters from anywhere in the string
export function removeCharacters(in_string, characters) {
    // Create a regular expression from the array of characters
    const regex = new RegExp(`[${characters.join('')}]`, 'g');
    // Replace all occurrences of the characters with an empty string
    return in_string.replace(regex, '');
};
// Example usage:
// Assuming local storage has a key "myData" with value like:
// { a: { b: { c: "desired value" } } }
// To retrieve the value of 'c', call:
// const value = getNestedValueFromLocalStorage('myData', ['a', 'b', 'c']);
// console.log(value); // Outputs: "desired value"

export function getNestedValueFromLocalStorage(storageKey, path) {
    // Retrieve and parse the data from local storage
    const data = JSON.parse(localStorage.getItem(storageKey));
    if (!data) return undefined;

    // Recursive helper function
    function getNestedValue(obj, pathArray) {
        if (pathArray.length === 0) return obj;
        if (obj === null || typeof obj !== 'object') return undefined;

        let nextKey = pathArray.shift();
        return getNestedValue(obj[nextKey], pathArray);
    }

    return getNestedValue(data, path);
}




// View all the local storage
export function viewAllLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(key, value);
    }
}

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
class Utility {
    static Object = {};
    static String = {};
    static Hash = {};
}
