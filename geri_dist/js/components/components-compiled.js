/* These web component don't use a shadow dom in order to allow external stylesheets like bootstrap and normalize */

// import { CharacterStorageManager } from '/js/app/CharacterStorageManager.js';


class NameComponent extends HTMLElement {

    constructor(){
        super()
        this.attachShadow({ mode: 'open' });
        this.caption="";
        this.name="Flint Fireforge";
        this.characterID = Util.URLutil.getParameter('charIdentifier')
        this.character_storage = new CharacterStorageManager(this.characterID)
    }

    render(){
        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                #input-container{
                    display:flex;
                    flex-direction:column;
                    width:300px;
                }

                #input-container > label {
                    margin:0;
                    line-height: auto;
                    font-size:1.25rem;
                }

                #input-container > input{
                    margin: 10px 0 10px 0;
                }
            </style>
            <div id="input-container">
                <label>${this.caption}</label>
                <input type="text" class="form-control form-control-lg" id="basic-input" value="${this.name}">
                <button id="chooser-button" class="btn btn-success btn-lg">Update</button>
            </div>
        `;
    this.setupButton()
    }
    setupButton() {
        let button = this.shadowRoot.getElementById('chooser-button');
        button.onclick = this.buttonClickEvent.bind(this)
    }
        
    buttonClickEvent(event){
        const input_value = this.shadowRoot.getElementById('basic-input').value;
        this.character_storage.addItem("name", input_value)
        this.name = this.character_storage.getItem("name")
        this.render()
        confirm("Name Updated!");
    }
    connectedCallback() {
        if (this.hasAttribute('caption')) {
            this.caption = this.getAttribute('caption');
        }
        if (this.hasAttribute('placeholder')) {
            this.placeholder = this.getAttribute('placeholder');
        }
        this.name = this.character_storage.getItem("name")
        this.render()
    }
};

customElements.define('moradin-input', NameComponent);

class DisplayComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.event_consume_name = ''; // Attribute for the event name
        this.base_path = '';   // Attribute for the base URL
    }

    connectedCallback() {
        this.render();

        // Set up attributes
        if (this.hasAttribute('event_consume_name')) {
            this.event_consume_name = this.getAttribute('event_consume_name');
            document.addEventListener(this.event_consume_name, (event) => this.handleEventChange(event));
        }
        
        if (this.hasAttribute('base_path')) {
            this.base_path = this.getAttribute('base_path');
        }
    }

    render() {
        this.shadowRoot.innerHTML = `<div id="display-div"></div>`;
    }

    handleEventChange(event) {
        const selectedValue = event.detail.value;
        this.fetchHtmlContent(selectedValue);
    }

    async fetchHtmlContent(value) {
        // Construct the full URL
        const url = `${this.base_path}/${value}.html`;
        try {
            const response = await fetch(url);
            const htmlContent = await response.text();
            this.shadowRoot.getElementById('display-div').innerHTML = htmlContent;
        } catch (error) {
            console.error('Error fetching HTML content:', error);
            this.updateContent('<p>Error loading content</p>');
        }
    }
}

customElements.define('moradin-display', DisplayComponent);

import { MoradinStorageManager } from '/js/app/MoradinStorageManager.js';
import { CharacterStorageManager } from '/js/app/CharacterStorageManager.js';
import * as Util from '/js/util/util-compiled.js'; 


class SelectionStore extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.event_consume_name = ''; // Attribute for the event name
        this.do_index = false; // Attribute for the event name
        this.select = false
        this.caption =''
        this.multiple_size='15'
        this.max_width=''
        this.store_name=false
        this.selection_limit=-1
        this.selection_count=0
        this.remove_type=''
        this.unique_options=false
        this.characterID=''
        this.characterID = Util.URLutil.getParameter('charIdentifier')
        this.character_storage = new CharacterStorageManager(this.characterID)
    }

    connectedCallback() {
        if (this.hasAttribute('event_consume_name')) {
            this.event_consume_name = this.getAttribute('event_consume_name');
            document.addEventListener(this.event_consume_name, (e) => {this.addOption(e.detail);});
        }
        if (this.hasAttribute('do_index')) {
            this.do_index = this.getAttribute('do_index');
        }
        if (this.hasAttribute('selection_limit')) {
            this.selection_limit = this.getAttribute('selection_limit');
        }
        if (this.hasAttribute('remove_type')) {
            this.remove_type = this.getAttribute('remove_type');
        }
        if (this.hasAttribute('unique_options')) {
            this.unique_options = this.getAttribute('unique_options');
        }
        if (this.hasAttribute('store_name')) {
            this.store_name = this.getAttribute('store_name');
        }
        if (this.hasAttribute('multiple_size')) {
            this.multiple_size = this.getAttribute('multiple_size');
        }

       this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <style>
            #select-container{
                max-width:${this.max_width};
            }
            select {
                margin-bottom: 10px;
            }
            
        </style>
        <div id="select-container">
            <label class="form-select-lg" for="json-select">${this.caption}</label>
            <select 
                class="form-select form-select-lg"
                multiple 
                size="${this.multiple_size}"
                id="shadow-select" 
                name="shadow-select">
            </select>
            <button id="chooser-button" class="btn btn-danger btn-lg">Remove option(s)</button>
        </div>
    `;
        this.setupButton()
        this.makeSelect()
    }

    setupButton() {
        let button = this.shadowRoot.getElementById('chooser-button');
        button.onclick = this.buttonClickEvent.bind(this)
    }
    buttonClickEvent(){
        if (this.remove_type === 'last'){
            this.removeLastOption()
            return
        } 
        this.removeSelectedOptions()
    }
    removeLastOption() {
        let list = this.character_storage.getItem(this.store_name)
        if (list){
            let list_len = parseInt(list.length)
            this.character_storage.removeItemFromList(this.store_name, list_len - 1)
        }
        this.makeSelect()
    }

    removeSelectedOptions() {
        var selectElement = this.shadowRoot.getElementById('shadow-select');
        if (!selectElement) return;
    
        for (var i = selectElement.options.length - 1; i >= 0; i--) {
            let option = selectElement.options[i]
            if (option.selected) {
                this.character_storage.removeItemFromList(this.store_name, i)
            }
        }
        this.makeSelect()
    }


    makeSelect(){
        let char_data = this.character_storage.getItem(this.store_name)
        console.log(char_data)
        let selectElement = this.shadowRoot.getElementById('shadow-select');
        selectElement.innerHTML = '';

        // check if the store is empty
        if (!char_data){
            return
        }

        for (let index in char_data){
            let storage_item = char_data[index]
            let value = storage_item.value
            let text = storage_item.text

            if(this.do_index){
                let display_index = parseInt(index) + 1
                text = display_index + " - " + text
            }

            let option = this.makeOption(value, text)
            selectElement.appendChild(option);
        }
    }

    makeOption(value, text){
        let option = document.createElement('option');
        option.value=value
        option.textContent = text;
        return option
    }

    addOption(data){
        let char_store = this.character_storage.getItem(this.store_name)
        if(this.selection_limit > 0 && char_store.length >= this.selection_limit){
            return
        }

        if(this.unique_options){
            for( let index in char_store){
                let item = char_store[index]
                if (item.text == data.value){
                    return
                }
            }
        }

        let text = data.value
        let value = Util.Hash.generateRandomHash(6)
        if(!this.store_name){
            console.log("No store name defined!")
            return
        }
        this.character_storage.addItemToList(this.store_name, {
            "text": text,
            "value": value
        })
        this.makeSelect()
    }

}

customElements.define('moradin-selection-store',  SelectionStore);

// import * as Util from '/js/util/util-compiled.js'; 


class AbilityComponent extends HTMLElement {

    constructor(){
        super()
        this.attachShadow({ mode: 'open' });
        this.characterID = Util.URLutil.getParameter('charIdentifier')
        this.character_storage = new CharacterStorageManager(this.characterID)
    }

    render(){
        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                #input-container{
                    width:800px;
                }
                tr, td {
                    border-bottom:none;
                }
                label{
                    margin-left:0;
                    padding-left: 0;
                }
                .ability-score{
                    width: 75px;
                }
                .small-col{
                    width:100px;
                }
            </style>
            
            <div id="input-container">
                <table id="ability-table" class="table"> <!-- can add  table-bordered class for UI troubleshooting-->
                    <tbody>
                        <tr>
                            <td class="small-col"><label class="form-select-lg">Strength</label></td>
                            <td class="small-col"><input id="strength-ability-score" result-id="strength-result" type="text" class="form-control form-control-lg ability-score" value=""></td>
                            <td><label class="form-select-lg" id="strength-result"></label></td>
                        </tr>
                        <tr>
                            <td><label class="form-select-lg">Dexterity</label></td>
                            <td><input id="dexterity-ability-score" result-id="dexterity-result" type="text" class="form-control form-control-lg ability-score" value=""></td>
                            <td><label class="form-select-lg" id="dexterity-result"></label></td>
                        </tr>
                        <tr>
                            <td><label class="form-select-lg">Constitution</label></td>
                            <td><input id="constitution-ability-score" result-id="constitution-result" type="text" class="form-control form-control-lg ability-score" value=""></td>
                            <td><label class="form-select-lg" id="constitution-result"></label></td>
                        </tr>
                        <tr>
                            <td><label class="form-select-lg">Intelligence</label></td>
                            <td><input id="intelligence-ability-score" result-id="intelligence-result" type="text" class="form-control form-control-lg ability-score" value=""></td>
                            <td><label class="form-select-lg" id="intelligence-result"></label></td>
                        </tr>
                        <tr>
                            <td><label class="form-select-lg">Wisdom</label></td>
                            <td><input id="wisdom-ability-score" result-id="wisdom-result" type="text" class="form-control form-control-lg ability-score" value=""></td>
                            <td><label class="form-select-lg" id="wisdom-result"></label></td>
                        </tr>
                        <tr>
                            <td><label class="form-select-lg">Charisma</label></td>
                            <td><input id="charisma-ability-score" result-id="charisma-result" type="text" class="form-control form-control-lg ability-score" value=""></td>
                            <td><label class="form-select-lg" id="charisma-result"></label></td>
                        </tr>  
                    </tbody>
                </table>
                <table class="table">
                    <tbody>
                        <tr>
                            <td><button id="roll-button" class="btn btn-info btn-lg">Roll</button></td>
                            <td>
                                <input id="num_dice" type="text" value="3" class="form-control form-control-lg" style="display:inline;width:50%;"> 
                                <label class="form-select-lg">d6</label> 
                            </td>
                            <td> 
                                <span class="form-select-lg"> + </span> 
                                <input id="roll_bonus" type="text" class="form-control form-control-lg" style="display:inline;width:50%;" value="0">
                            </td>
                        </tr>
                        <tr>
                            <td> 
                                <label class="form-select-lg">Drop lowest?</label>
                            </td>
                            <td style="text-align:center; display:flex; align-items: center;">
                                <input type="checkbox" class="form-check-input" id="drop-lowest-checkbox" style="width:25px;height:25px; border:solid 1px black;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="100">
                                <span class="form-select-lg"> Note: Standard Array is 15, 14, 13, 12, 10, 8</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            
        `;
    this.setupButton()
    this.setupInputs()
    }

    setupInputs(){
        const parentElement = this.shadowRoot.getElementById("ability-table");
        const elementsWithClass = parentElement.querySelectorAll(".ability-score");
        elementsWithClass.forEach((element) => {
            element.addEventListener("input", (event) => {
                this.updateInput(event);
            });
        });
        elementsWithClass.forEach((element) => {
            element.value = this.character_storage.getItem(element.id)
        });
    }

    updateInput(event){
        const elementId = event.target.id;
        const elementValue = event.target.value;
        this.character_storage.addItem(elementId, elementValue)
        console.log(`Element ID: ${elementId}, Value: ${elementValue}`);
    }
    
    setupButton() {
        let button = this.shadowRoot.getElementById('roll-button');
        button.onclick = this.buttonClickEvent.bind(this)
    }
        
    buttonClickEvent(event){
        let num_dice = this.shadowRoot.getElementById('num_dice').value 
        let roll_bonus = this.shadowRoot.getElementById('roll_bonus').value 
        roll_bonus = parseInt(roll_bonus)
        const checkboxElement = this.shadowRoot.getElementById("drop-lowest-checkbox");
        const isChecked = checkboxElement.checked;
        let drop_lowest = false;
        if (isChecked) {
            drop_lowest = true;
        }
        
        const parentElement = this.shadowRoot.getElementById("ability-table");
        const elementsWithClass = parentElement.querySelectorAll(".ability-score");
        elementsWithClass.forEach((element) => {
            let roll_result = Util.Random.dice_roll(num_dice, 6, roll_bonus, drop_lowest)
            element.value = roll_result.total
            // trigger 'input' event
            const inputEvent = new Event('input', {
                bubbles: true,
                cancelable: true
            });
            element.dispatchEvent(inputEvent);
            // end 'input' event 
            const spanId = element.getAttribute("result-id");
            const spanElement = this.shadowRoot.getElementById(spanId);
            const rolls = roll_result.rolls.join(", ");
            const dropped = roll_result.dropped
            spanElement.textContent = "rolls: " + rolls + " | bonus: " + roll_bonus + " | dropped: " + dropped ;
        });
    }
    connectedCallback() {
        this.render()
    }
};

customElements.define('moradin-ability', AbilityComponent);

/*
Example usage:

      <mutant-select 
        max-width="350px"
        caption="Select a race:"
        multiple-size="15"
        data-path="/compiled_data/races/race-names.json"
        event_emit_name="race-select"/>

Notes:        
 the web componentcdn call should theoretically use the browser cache. keep an eye on it for performance issues.
*/
class SelectComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.caption = "Select an option:"; // Default value for caption
        this.multiple_size = "5"; 
        this.width='auto';
        this.event_emit_name='no_event_name_assigned';
        this.button_event_name='no_event_name_assigned';
        this.currently_selected="";
    }

    render(){
        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                #select-container{
                    max-width:${this.max_width};
                }
                select {
                    margin-bottom: 10px;
                }
                .disabled{
                    pointer-events: none;
                    cursor: not-allowed;
                    opacity: 0.65;
                    filter: alpha(opacity=65);
                    -webkit-box-shadow: none;
                    box-shadow: none;
                }
            </style>
            <div id="select-container">
                <label class="form-select-lg" for="json-select">${this.caption}</label>
                <select 
                    class="form-select form-select-lg"
                    multiple 
                    size="${this.multiple_size}"
                    id="json-select" 
                    name="json-select">
                </select>
                <button id="chooser-button" class="btn btn-success btn-lg">Select option</button>
            </div>
        `;
        this.setupButton()
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    connectedCallback() {
        if (this.hasAttribute('data-path')) {
            const currentDomain = window.location.origin;
            const path = this.getAttribute('data-path');
            this.fetchData(currentDomain + path);
        }
        if (this.hasAttribute('caption')) {
            this.caption = this.getAttribute('caption');
        }
        if (this.hasAttribute('multiple-size')) {
            this.multiple_size = this.getAttribute('multiple-size');
        }
        if (this.hasAttribute('multiple-size')) {
            this.multiple_size = this.getAttribute('multiple-size');
        }
        if (this.hasAttribute('max-width')){
            this.max_width =this.getAttribute('max-width')
        }
        if (this.hasAttribute('event_emit_name')){
            const event_name = this.getAttribute('event_emit_name')
            this.event_emit_name= event_name
            this.button_event_name="button-" + event_name
        }
        this.render()
    }

    setupButton() {
        let button = this.shadowRoot.getElementById('chooser-button');
        button.onclick = this.buttonClickEvent.bind(this)
    }
    
    buttonClickEvent(event){
        if(this.selection_limit > 1 && this.selection_count > this.selection_limit){
            return
        }
   // Emit a custom event with the selected value
        const select_value = this.shadowRoot.getElementById('json-select').value;
        this.dispatchEvent(new CustomEvent( this.button_event_name , {
            detail: { value: select_value },
            bubbles: true, // Allows the event to bubble up through the DOM
            composed: true // Allows the event to cross the shadow DOM boundary
        }));
    }

    onSelectChange(event) {
        // Emit a custom event with the selected value
        this.dispatchEvent(new CustomEvent(this.event_emit_name, {
            detail: { value: event.target.value },
            bubbles: true, // Allows the event to bubble up through the DOM
            composed: true // Allows the event to cross the shadow DOM boundary
        }));
    }

    async fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.populateSelect(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    populateSelect(data) {
        let default_height = Object.keys(data).length
        if ( !this.hasAttribute('multiple-size') ) {
            this.multiple_size = default_height;
        }
        this.render()
        const select = this.shadowRoot.getElementById('json-select');
        select.addEventListener('change', (event) => this.onSelectChange(event));
        select.innerHTML = data.map(item => `<option value="${item}">${item}</option>`).join('');
    }
}

customElements.define('moradin-select', SelectComponent);

