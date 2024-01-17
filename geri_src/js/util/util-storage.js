function getNestedLocalStorageValue(keyPath) {
    const keys = keyPath.split('.'); // Split the key path
    let currentValue = localStorage.getItem(keys.shift()); // Get the first key's value from localStorage

    try {
        currentValue = JSON.parse(currentValue); // Parse the JSON string

        keys.forEach(key => {
            currentValue = currentValue[key]; // Traverse the object
            if (currentValue === undefined) {
                throw new Error('Key not found');
            }
        });

        return currentValue;
    } catch (error) {
        console.error('Error retrieving nested value:', error);
        return null;
    }
}

function viewAllLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(key, value);
    }
}