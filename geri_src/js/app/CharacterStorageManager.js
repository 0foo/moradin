import { MoradinStorageManager } from '/js/app/MoradinStorageManager.js'


export class CharacterStorageManager{
    constructor(characterId){
        this.characterId=characterId
        this.storage_manager = new MoradinStorageManager()
    }

    getAll(){
        return this.storage_manager.loadFullCharacterData()[this.characterId]
    }

    getItem(key){
        let character_data = this.storage_manager.loadFullCharacterData()[this.characterId]
        if(key in character_data){
            return character_data[key]
        }
        return false
    }

    addItemToList(list_name, value){
        let full_data = this.storage_manager.loadFullCharacterData()
        let character_data = full_data[this.characterId]
        if(!list_name){
            return
        }
        
        if (!(list_name in character_data)) {
            character_data[list_name] = []
        }
        character_data[list_name].push(value)
        this.storage_manager.saveFullCharacterData(full_data)
    }

    removeItemFromList(list_name, index){
        let full_data = this.storage_manager.loadFullCharacterData()
        let character_data = full_data[this.characterId]
        character_data[list_name].splice(index, 1);
        this.storage_manager.saveFullCharacterData(full_data)
    }

    removeItemFromDictList(list_name, key, value){
        let full_data = this.storage_manager.loadFullCharacterData()
        let character_data = full_data[this.characterId]

        if (!(list_name in character_data) || character_data[list_name].length === 0) {
            return
        }

        if (typeof character_data[list_name][0] === 'object' && character_data[list_name][0] !== null) {
            return
        } 

        let index =  character_data[list_name].findIndex(item => item[key] === value);

        if (index !== -1) {
            character_data[list_name].splice(index, 1);
        }
        this.storage_manager.saveFullCharacterData(full_data)
    }

    addItem(key, value){
        let full_data = this.storage_manager.loadFullCharacterData()
        let character_data = full_data[this.characterId]
        character_data[key] = value
        this.storage_manager.saveFullCharacterData(full_data)
    }

    removeItem(key){
        let full_data = this.storage_manager.loadFullCharacterData()
        let character_data = full_data[this.characterId]
        delete character_data[key]
        this.storage_manager.saveFullCharacterData(full_data)
    }

    
}