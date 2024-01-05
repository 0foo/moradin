class ClassModel{
    constuctor(){
        this.data = window.selected_class_object
        this.name = data.name.capitalizeFirstLetter()
        this.description = data.description
        this.proficiencies = JSON.parse(data.proficiency).join(", ").toUpperCase() 
        this.caster_progression = data.casterProgression.capitalizeFirstLetter().returnIfNotPresent("N/A")
        this.caster_type = data.casterType.returnIfNotPresent("Not a").capitalizeFirstLetter()
        this.spellcasting_ability = data.spellcastingAbility.trimChar("\"").capitalizeFirstLetter().returnIfNotPresent("N/A") 
    }
}