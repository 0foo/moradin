---
processor: [
    remove_blank_lines
]
---

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

