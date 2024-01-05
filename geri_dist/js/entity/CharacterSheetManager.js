import { ToDo } from '/js/entity/ToDo.js'
import { CharacterSheet } from '/js/entity/CharacterSheet.js';


class CharacterSheetManager{
    constructor(start_sheet=null){
        if (start_sheet == null){
            this.start_sheet = new CharacterSheet()
            this.create_level_0()
        }
        else{
            this.start_sheet = start_sheet
        }
        this.final_sheet = structuredClone(this.start_sheet)
    }
    

    create_level_0(){

        let to_dos = [
            "name",
            "race",
            "subclass",
            "abilities",
            "spells",
            "items",
            "proficiencies",
            "background"
        ];

        let to_do_list=[]

        to_do_list = to_dos.map(subject => {
            return new ToDo(subject,"create")
        });

        to_do_list.push(
            new ToDo("total_level","increment")
        );

        to_do_list.push(
            new ToDo("class","create")
        );
        
        window.to_do_manager.push_list(to_do_list)
    }
}   


export{
    CharacterSheetManager
};