export const Hash = {
    generateRandomHash: function(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
export const String = {
    capitalizeFirstLetter: function(in_string) {
        return in_string.charAt(0).toUpperCase() + in_string.slice(1);
    },
    returnIfNotPresent: function(in_string, fallbackValue) {
        the_text = in_string.valueOf()
        if (the_text.toUpperCase() === "NULL" || the_text.toUpperCase() === "N/A") {
            return fallbackValue
        }
        return in_string
    },
    trimChar: function(in_string, charToRemove) {
        /* trims specified characters from from and end of string */
        const regExp = new RegExp(`^${charToRemove}+|${charToRemove}+$`, 'g');
        return in_string.replace(regExp, '');
    },
    removeCharacters: function(in_string, characters) {
        // Create a regular expression from the array of characters
        const regex = new RegExp(`[${characters.join('')}]`, 'g');
        // Replace all occurrences of the characters with an empty string
        return in_string.replace(regex, '');
    }
};
export const Storage = {
    getNestedValueFromLocalStorage: function(storageKey, path) {
        /* Example usage:
        Assuming local storage has a key "myData" with value like:
        { a: { b: { c: "desired value" } } }
        To retrieve the value of 'c', call:
        const value = getNestedValueFromLocalStorage('myData', ['a', 'b', 'c']);
        console.log(value); // Outputs: "desired value" */
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
    },
    wipeAllLocalStorage: function() {
    },
    viewAllLocalStorage: function() {
        // View all the local storage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            console.log(key, value);
        }
    },
    clear: function(){
        localStorage.clear()
    }
}
export const UtilObject ={
    findElementByProperty: function(obj, propName, propValue) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key][propName] === propValue) {
                    return obj[key];
                }
            }
        }
        return null;
    },
    // this checks if an object is empty
    isEmpty: function(obj) {
        // add a check to ensure object
        for (let key in obj) {
            if (this.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    },
    // add data to a json object with dot notation
    // // Example usage
    // let myObj = {};
    // addRecursively('key1.key2.key3', 'some_value', myObj);
    // console.log(myObj);
    addRecursively(path, value, obj) {
        const keys = path.split('.');
        let current = obj;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const isLastKey = i === keys.length - 1;
            // Check if the key is an array index
            if (key.match(/^\d+$/)) {
                const index = parseInt(key, 10);
                // Ensure the current level is an array
                if (!Array.isArray(current)) {
                    throw new Error("Path leads through a non-array element");
                }
                // Fill the array with empty objects if needed
                while (current.length <= index) {
                    current.push({});
                }
                if (isLastKey) {
                    current[index] = value;
                } else {
                    current = current[index];
                }
            } else {
                // Ensure the current level is an object
                if (current[key] === undefined || current[key] === null || typeof current[key] !== 'object') {
                    current[key] = {};
                }
                if (isLastKey) {
                    current[key] = value;
                } else {
                    current = current[key];
                }
            }
        }
        return obj;
    }
}
export const URLutil = {
    openLocation: function(newPath, queryParams, openInNewTab = true) {
        /*
        // Example usage:
            const queryParams = {
            character_id: 1231245,
            another_param: 'value'
            };
            // If openInNewTab is not provided, it will default to true
            openInNewTabOrWindow('/edit.html', queryParams);
        */
        // Construct the full URL with query parameters
        const currentURL = new URL(window.location.href);
        currentURL.pathname = newPath;
        // Add query parameters to the URL
        for (const [key, value] of Object.entries(queryParams)) {
          currentURL.searchParams.set(key, value);
        }
        // Determine the target
        const target = openInNewTab ? '_blank' : '_self'; // '_blank' opens in a new tab, '_self' opens in the same tab/window
        // Open the URL in a new tab or the same tab/window
        const newWindow = window.open(currentURL.toString(), target);
        if (newWindow && openInNewTab) {
          newWindow.focus();
        }
      },
      getParameter(parameter_key){
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(parameter_key);
      }
}
