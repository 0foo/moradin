/* These web component don't use a shadow dom in order to allow external stylesheets like bootstrap and normalize */

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

    //    for (option in this.character_id_storage[this.store_name]){
    //        this.putOption(option)
    //    }

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
    // this.setupButton()
        this.makeSelect()
    }

    removeLastOption() {
        let index = 
        this.character_storage.removeItemFromList(this.store_name, index)
    }

    removeSelectedOptions() {
        var selectElement = this.shadowRoot.getElementById('shadow-select');
        if (!selectElement) return;
    
        for (var i = selectElement.options.length - 1; i >= 0; i--) {
            let option = selectElement.options[i]
            if (option.selected) {
                this.removeOption(option.value)
            }
        }
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

