import { MoradinStorageManager } from '/js/app/MoradinStorageManager.js'


export class CharacterStorageManager{
    constructor(characterId){
        this.characterId=characterId
        this.storage_manager = new MoradinStorageManager()
        this.character_data = this.storage_manager.full_character_data[this.characterId]
    }

    getItem(key){
        return this.character_data[key]
    }

    addItemToList(list_name, value){
        if (!(list_name in this.character_data)) {
            this.character_data[list_name] = []
        }
        this.character_data[list_name].push(value)
        this.storage_manager.saveFullCharacterData()
    }

    removeItemFromList(list_name, index){
        this.character_data[list_name].splice(index, 1);
        this.storage_manager.saveFullCharacterData()
    }

    removeItemFromDictList(list_name, key, value){
        if (!(list_name in this.character_data) || this.character_data[list_name].length === 0) {
            return
        }

        if (typeof this.character_data[list_name][0] === 'object' && this.character_data[list_name][0] !== null) {
            return
        } 

        let index =  this.character_data[list_name].findIndex(item => item[key] === value);

        if (index !== -1) {
            this.character_data[list_name].splice(index, 1);
        }
        this.storage_manager.saveFullCharacterData()
    }

    addItem(key, value){
        this.character_data[key] = value
        this.storage_manager.saveFullCharacterData()
    }

    removeItem(key){
        delete this.character_data[key]
        this.storage_manager.saveFullCharacterData()
    }

    
}