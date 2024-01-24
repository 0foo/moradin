import * as Util  from  '/js/util/util-compiled.js'


export class MoradinStorageManager {
    constructor(characterId=false) {
        this.root_application_namespace = "character_generator";
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem(this.root_application_namespace)) {
            localStorage.setItem(this.root_application_namespace, JSON.stringify({}));
        }
    }

    loadFullCharacterData(){
        let storageCharData = localStorage.getItem(this.root_application_namespace);
        return storageCharData ? JSON.parse(storageCharData) : {};
    }

    saveFullCharacterData(full_character_data){
        full_character_data = JSON.stringify(full_character_data)
        localStorage.setItem(this.root_application_namespace, full_character_data);
    }

    getIdentifierAndNames() {
        let full_character_data = this.loadFullCharacterData()
        return Object.keys(full_character_data).reduce((acc, key) => {
            acc[key] = full_character_data[key].name;
            return acc;
        }, {});
    }

    getCharacterNames(){
        let full_character_data=this.loadFullCharacterData()
        return Object.values(full_character_data).map(obj => obj.name);
    }

    getCharacterIdentifiers(){
        let full_character_data=this.loadFullCharacterData()
        return Object.keys(full_character_data)
    }
    
    getSingleCharacterIdentifier(){
        // Utility.Object.
    }

    newBlankCharacter(name=""){
        let full_character_data=this.loadFullCharacterData()
        if (name.trim() === ""){
            name = "name_" + Util.Hash.generateRandomHash(6);
        }
        let hash = Util.Hash.generateRandomHash(6);
        full_character_data[hash] = {
            "name": name
        };
        this.saveFullCharacterData(full_character_data)
    }

    getCharacterById(char_id){
        let full_character_data=this.loadFullCharacterData()
        if(char_id in full_character_data){
            return full_character_data[char_id]
        }
        return {}
    }
    
    deleteCharacterByName(charName){
        let full_character_data=this.loadFullCharacterData()
        Object.keys(full_character_data).forEach(hash => {
            if (characters[hash].name === charName) {
                delete characters[hash];
            }
        });
        this.saveFullCharacterData(full_character_data)
    }

    deleteCharacterById(charId){
        let full_character_data=this.loadFullCharacterData()
        delete full_character_data[charId]
        this.saveFullCharacterData(full_character_data)
    }
}

