import { MoradinStorageManager } from '/js/app/MoradinStorageManager.js';
import * as Util from  '/js/util/util-compiled.js'


// Util.Storage.clear()

let char_store = new MoradinStorageManager()

document.getElementById('viewCharacterBtn').addEventListener('click', function() {
    console.log('view character')
    Util.URL.changeLocation('edit.html', ["charIdentifier", ])
});

document.getElementById('editCharacterBtn').addEventListener('click', function() {
    let the_identifier = getFirstSelectOption().value

    Util.URLutil.openLocation('edit.html', {"charIdentifier": the_identifier})
});

document.getElementById('addCharacterBtn').addEventListener('click', function() {
    const characterName = prompt('Enter the character\'s name (can be changed later):');
    char_store.newBlankCharacter(characterName)
    updateSelectBox()
});

document.getElementById('deleteCharacterBtn').addEventListener('click', function() {
    let char_id = getFirstSelectOption().value
    char_store.deleteCharacterById(char_id)
    updateSelectBox()
});

document.addEventListener('DOMContentLoaded', function() {
    updateSelectBox()
});

function updateSelectBox(){
    document.getElementById('characterSelect').innerHTML = '';
    const characterData = char_store.getIdentifierAndNames()

    for (let identifier in characterData) {
        if (characterData.hasOwnProperty(identifier)) {
          const name = characterData[identifier];
          addToSelectBox(identifier, name)
        }
      }
}

function addToSelectBox(characterId, characterName){
    const selectBox = document.getElementById('characterSelect');
    const newOption = document.createElement('option');
    newOption.text = characterName;
    newOption.value = characterId;
    selectBox.add(newOption);
}

function getFirstSelectOption(){
    const selectElement = document.getElementById('characterSelect');
    const selectedIndex = selectElement.selectedIndex;
    return selectElement.options[selectedIndex];
}

function changeLocation(newPath, ){
    const currentURL = new URL(window.location.href);
    const characterId = 1231245;
    currentURL.pathname = newPath;
    currentURL.searchParams.set('character_id', characterId);
    window.location.href = currentURL.toString();
}

