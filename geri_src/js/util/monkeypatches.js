// Monkey patches
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// if the string equals null or n/a (case insensitive) it will return the value passed.
// note: this could be generalized more with an array of values passed in
String.prototype.returnIfNotPresent = function(fallbackValue) {
    the_text = this.valueOf()
    if (the_text.toUpperCase() === "NULL" || the_text.toUpperCase() === "N/A") {
        return fallbackValue
    }
    return this
};

String.prototype.trimChar = function(charToRemove) {
    const regExp = new RegExp(`^${charToRemove}+|${charToRemove}+$`, 'g');
    return this.replace(regExp, '');
};

// removes characters from anywhere in the string
String.prototype.removeCharacters = function(characters) {
    // Create a regular expression from the array of characters
    const regex = new RegExp(`[${characters.join('')}]`, 'g');
    // Replace all occurrences of the characters with an empty string
    return this.replace(regex, '');
};

// simply joins with a comma
Array.prototype.joinWithComma = function() {
    return this.join(', ');
};
Array.prototype.findObject = function(key, value) {
    let found = this.find(obj => obj[key] === value);
    return found
};

// this checks if an object is empty
Object.prototype.isEmpty = function() {
    for (let key in this) {
        if (this.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};
