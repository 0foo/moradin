







class CharacterManager{
    constructor(character_sheet){
        this.character_sheet = character_sheet
    }

    level_0(){
        
    }

    level_up(){
        

    }

}




class ScreenManager {
    constructor(){
        this.screens = {
            "class":{
                "to_do":{},
                "css_id": "Class"
            },
            "subclass": {
                "to_do":{},
                "css_id": "Subclass"
            },
            "race":{
                "to_do":{},
                "css_id": "Race"
            },
            "abilities":{
                "to_do":{},
                "css_id": "Abilities"
            },
            "proficiencies":{
                "to_do":{},
                "css_id": "Proficiencies"
            },
            "items":{
                "to_do":{},
                "css_id": "Items"
            }
        }
    }

    update_visibility() {
        Object.keys(this.screens).forEach(key => {
            item = this.screens[key]
            if (item.to_do.isEmpty()){
                hideElementById(item.css_id)
            }

        });
    }

    add_to_do(screen, action, data){
        let to_do = new ToDo(action, data)
        this.screens[screen].to_do 
    }



}





