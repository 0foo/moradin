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