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