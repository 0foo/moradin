class CharacterSheet{
    constructor(){
        this.data = {
            "total_level" :  0,
            "name" : null,
            "class" : {},
            "race" : null,
            "subclass" : {},
            "abilities":{
                "strength":{
                    "total": null,
                    "base": null,
                    "bonuses":{}
                },
                "dexterity":{
                    "total": null,
                    "base": null,
                    "bonuses":{}
                },
                "constitution":{
                    "total": null,
                    "base": null,
                    "bonuses":{}
                },
                "wisdom":{
                    "total": null,
                    "base": null,
                    "bonuses":{}
                },
                "intelligence":{
                    "total": null,
                    "base": null,
                    "bonuses":{}
                },
                "charisma":{
                    "total": null,
                    "base": null,
                    "bonuses":{}
                },
                "hit_points":{
                    "total": null,
                    "base": null,
                    "bonuses":{}
                },
                "damage":{
                    "total": null,
                    "base": null,
                    "bonuses":{}
                },
                "to_hit": {
                    "total": null,
                    "base": null,
                    "bonuses":{}
                },
                "proficiency_bonus":null
            },
            "saves":{},
            "spells":{},
            "items":{},
            "features":{},
            "proficiencies":{},
            "background":{}
        }
    }
}


export {
    CharacterSheet
};