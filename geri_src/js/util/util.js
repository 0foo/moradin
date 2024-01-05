async function fetch_json(url) {
    try {
        const response = await fetch(url, {cache: "force-cache"});
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Url: ' + url)
        return null; // Or handle the error as needed
    }
}

function hello_world(){
    console.log("Hello World")
}

async function fetch_text(url) {
    try {
        const response = await fetch(url, {cache: "force-cache"});
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Url: ' + url)
        return null; // Or handle the error as needed
    }
}

function hide_element_by_id(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    } else {
        console.log(`Element with ID '${elementId}' not found.`);
    }
}

function show_element_by_id(elementId, displayStyle = 'block') {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = displayStyle;
    } else {
        console.log(`Element with ID '${elementId}' not found.`);
    }
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export {
    fetch_json,
    fetch_text, 
    hide_element_by_id, 
    show_element_by_id,
    generateRandomString,
    hello_world
};
