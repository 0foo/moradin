---
processor: [
    remove_blank_lines
]
---


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


