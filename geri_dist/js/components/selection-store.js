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
