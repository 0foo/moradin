class ClassView{
    constructor(){
        this.selected_class=null
        this.selected_class_object=null
        this.selectBox=null
    }
    viewPopulate(view, element_id){
        let to_display = this.selected_class_object.class_views[0][view]
        document.getElementById(element_id).innerHTML=to_display
    }
    populateClassSelectBox(){
        this.selectBox = document.getElementById('class-select-box');
        this.selectBox.focus()
        let selectBox = this.selectBox
        window.class_data.forEach((item, index) => {
            let option = document.createElement('option');
            option.value = item.name;
            option.textContent = item.name.capitalizeFirstLetter();
            selectBox.appendChild(option);
        });
        selectBox.value = window.class_data[0].name;
        this.classUpdate()
        selectBox.addEventListener('change', this.classUpdate.bind(this) );
    }
    static async classUpdate(){
        this.selected_class = document.getElementById('class-select-box').value;
        this.selected_class_object = window.class_data.findObject("name", this.selected_class)
        this.viewPopulate('description', 'class-description-container')
        this.viewPopulate('startingProficiencies', 'class-starting-proficiency-html')
        this.viewPopulate('startingEquipment', 'class-starting-item-html')
        this.parseStartingData()
        this.parseFeatures()
    }
    parseFeatures() {
        let data = this.selected_class_object.class_features
    
        data.sort((a, b) => a.level - b.level);
    
        let html = '<div>';
    
        data.forEach(feature => {
            html += `<div>
                        <div>${feature.name}</div>
                        <div>${JSON.parse(feature.entries).join(", ")}</div>
                    </div>`;
        });
    
        html += '</div>';
        document.getElementById('class-features').innerHTML=html
    }

    registerSelectBoxChangeHandler(the_function){
        this.selectBox.addEventListener('change', the_function);
        this.selectBox.dispatchEvent(new Event('change', {
            'bubbles': false,
            'cancelable': false
        }));
    }

    hide_nav_selection(){

    }

    parseStartingData(){
        let data = this.selected_class_object
        let proficiency = JSON.parse(data.proficiency).map(item=>item.capitalizeFirstLetter()).join(",")
        let caster_progression = data.casterProgression.returnIfNotPresent("None").capitalizeFirstLetter()
        let caster_type = data.casterType.returnIfNotPresent("None").capitalizeFirstLetter()
        let spellcasting_ability = (() => {
            try {
                return JSON.parse(data.spellcastingAbility).capitalizeFirstLetter()
            }
            catch(err){
                return "None"
            }
        })()
        
        let data_string = `
            <div>Hit Dice: ${data.hd}</div>
            <div>Proficiencies: ${ proficiency } </div>
            <div>Caster type: ${ caster_progression }, ${ caster_type } caster</div>
            <div>Spellcasting Ability: ${spellcasting_ability}</div>
            <div>Ability score/Feat levels: ${JSON.parse(data.ability_score_improve).join(", ") }
            <div>Reference: <a href="http://dnd5e.wikidot.com/${data.name}">Wikidot</a></div>
        `
        document.getElementById("starting-data-html").innerHTML=data_string
    }

    convertToDoDataToHtmlList(data) {
        // Create a <ul> element
        let ul = document.createElement('ul');
    
        // Iterate over each object in the data array
        data.forEach(item => {
            // Create a <li> element for each object
            let li = document.createElement('li');
            li.textContent = ` ${item.class.capitalizeFirstLetter()}: ${item.level}`;
    
            // Append the <li> to the <ul>
            ul.appendChild(li);
        });
    
        // Select the div with ID 'Class-Nav-Display'
        let targetDiv = document.getElementById('Class-Nav-Display');

        // Append the list to the div
        targetDiv.appendChild(ul);
    }
}



export {
    ClassView
};