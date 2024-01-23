export class StorageManager {
    constructor() {
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

    getCharacterNames(){
        return Object.values(this.full_character_data).map(obj => obj.name);
    }

    getCharacterIdentifiers(){
        return Object.keys(this.full_character_data)
    }
    
    getSingleCharacterIdentifier(){
        Utility.Object.
    }

    newBlankCharacter(name=""){
        let hash = generateRandomHash(6);
        this.full_character_data[hash] = {
            "name": name
        };
        this.saveFullCharacterData()
    }
    
    deleteCharacterByName(charName){
        Object.keys(this.full_character_data).forEach(hash => {
            if (characters[hash].name === charName) {
                delete characters[hash];
            }
        });
        this.saveFullCharacterData()
    }
}


export class StorageManager {
    constructor() {
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

    getCharacterNames(){
        return Object.values(this.full_character_data).map(obj => obj.name);
    }

    getCharacterIdentifiers(){
        return Object.keys(this.full_character_data)
    }
    
    getSingleCharacterIdentifier(){
        Utility.Object.
    }

    newBlankCharacter(name=""){
        let hash = generateRandomHash(6);
        this.full_character_data[hash] = {
            "name": name
        };
        this.saveFullCharacterData()
    }
    
    deleteCharacterByName(charName){
        Object.keys(this.full_character_data).forEach(hash => {
            if (characters[hash].name === charName) {
                delete characters[hash];
            }
        });
        this.saveFullCharacterData()
    }
}


