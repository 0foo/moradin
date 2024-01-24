import * as Util  from  '/js/util/util-compiled.js'


export class MoradinStorageManager {
    constructor(characterId=false) {
        this.root_application_namespace = "character_generator";
        this.initializeStorage();
        this.full_character_data=this.loadFullCharacterData()
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

    saveFullCharacterData(){
        localStorage.setItem(this.root_application_namespace, JSON.stringify(this.full_character_data));
    }

    getIdentifierAndNames() {
        return Object.keys(this.full_character_data).reduce((acc, key) => {
            acc[key] = this.full_character_data[key].name;
            return acc;
        }, {});
    }

    getCharacterNames(){
        return Object.values(this.full_character_data).map(obj => obj.name);
    }

    getCharacterIdentifiers(){
        return Object.keys(this.full_character_data)
    }
    
    getSingleCharacterIdentifier(){
        // Utility.Object.
    }

    newBlankCharacter(name=""){
        if (name.trim() === ""){
            name = "name_" + Util.Hash.generateRandomHash(6);
        }
        let hash = Util.Hash.generateRandomHash(6);
        this.full_character_data[hash] = {
            "name": name
        };
        this.saveFullCharacterData()
    }

    getCharacterById(char_id){
        if(char_id in this.full_character_data){
            return this.full_character_data[char_id]
        }
        return {}
    }
    
    deleteCharacterByName(charName){
        Object.keys(this.full_character_data).forEach(hash => {
            if (characters[hash].name === charName) {
                delete characters[hash];
            }
        });
        this.saveFullCharacterData()
    }

    deleteCharacterById(charId){
        delete this.full_character_data[charId]
        this.saveFullCharacterData()
    }
}

