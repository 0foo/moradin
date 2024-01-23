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
