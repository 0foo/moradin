document.getElementById('viewCharacterBtn').addEventListener('click', function() {
    console.log('view character')
});

document.getElementById('editCharacterBtn').addEventListener('click', function() {
    console.log('edit character')
});

document.getElementById('addCharacterBtn').addEventListener('click', function() {
    const characterName = prompt("Enter the character's name:");
    if (characterName) {
        addToSelectBox(characterName)
        addToStorage(characterName)
    }
});

document.getElementById('deleteCharacterBtn').addEventListener('click', function() {
    const selectBox = document.getElementById('characterSelect');
    for (let i = selectBox.options.length - 1; i >= 0; i--) {
        if (selectBox.options[i].selected) {
            console.log(selectBox.options[i])
        }
    }
    
});

document.addEventListener('DOMContentLoaded', function() {
    const characterData = localStorage.getItem('character-generator');
    if (characterData) {
        const characterObj = JSON.parse(characterData);
        for (let key in characterObj) {
            addToSelectBox(key)
        }
    }
});





function addToSelectBox(characterName){
    const selectBox = document.getElementById('characterSelect');
    const newOption = document.createElement('option');
    newOption.text = characterName;
    newOption.value = characterName.toLowerCase().replace(/\s/g, '');
    selectBox.add(newOption);
}

function addToStorage(characterName){
    const storage_char_data = localStorage.getItem('character-generator');
    let characterData = data ? JSON.parse(data) : {};
    const namesList = arrayOfObjects.map((obj) => obj.name);
    if ( !characterData.hasOwnProperty(characterName)){
        characterData[characterName] = {};
    }
    localStorage.setItem('character-generator', JSON.stringify(characterData));
}

function deleteFromStorage(characterName){
    const data = localStorage.getItem('character-generator');
    let characterData = data ? JSON.parse(data) : {};
    if (characterData.hasOwnProperty(characterName)){
        delete characterData[characterName]; 
    }
    localStorage.setItem('character-generator', JSON.stringify(characterData));
}


