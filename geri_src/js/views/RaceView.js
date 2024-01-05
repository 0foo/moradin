class RaceView{
    constructor(){
        this.selected_class=null
        this.selected_class_object=null
        this.selectBox=null
    }
    populateRaceSelectBox(){
        this.selectBox = document.getElementById('race-select-box');
        let selectBox = this.selectBox
        window.race_data.forEach((item, index) => {
            let option = document.createElement('option');
            option.value = item.name + "-" + item.source;
            option.textContent = item.name + "-" + item.source;
            selectBox.appendChild(option);
        });
        selectBox.value = window.class_data[0].name;
        this.classUpdate()
        selectBox.addEventListener('change', this.classUpdate.bind(this) );
    }
    classUpdate(){
        this.selected_class = document.getElementById('class-select-box').value;
        this.selected_class_object = window.class_data.findObject("name", this.selected_class)
        this.viewPopulate('description', 'class-description-container')
        this.viewPopulate('startingProficiencies', 'class-starting-proficiency-html')
        this.viewPopulate('startingEquipment', 'class-starting-item-html')
        this.parseStartingData()
        this.parseFeatures()
    }


}



export {
    ClassView
};