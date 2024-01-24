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
        this.storage_manager = new MoradinStorageManager()
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
    this.setupButton()
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
        var selectElement = this.shadowRoot.getElementById('shadow-select');
        if (selectElement && selectElement.options.length > 0) {
            selectElement.remove(selectElement.options.length - 1);
            this.selection_count =  this.selection_count - 1
        }
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

    optionExists(optionText) {
        var selectElement = this.shadowRoot.getElementById('shadow-select');
        if (!selectElement) return false;
    
        for (var i = 0; i < selectElement.options.length; i++) {
            if (selectElement.options[i].text=== optionText) {
                return true;
            }
        }
        return false;
    }

    buildSelect(){
        let store_data = this.character_storage.getItem(this.store_name)
        for (option in store_data){
            this.putOption(option.value, option.text)
        }
    }

    addOption(data) {
        if(this.selection_limit > 0 && this.selection_count >= this.selection_limit){
            return
        }

        if(this.unique_options && this.optionExists(data.value)){
            return
        }
        let text = data.value
        if(this.do_index){
            let cur_count = this.selection_count + 1
            text = cur_count + " - " + text
        }
        let value_hash = Util.Hash.generateRandomHash(6)
        this.putOption(value_hash, text)
        this.selection_count += 1
    }

    putOption(value, text){
        let option = document.createElement('option');
        option.value=value
        option.textContent = text;
        let select = this.shadowRoot.getElementById('shadow-select')
        select.appendChild(option);
    }

    removeOption(value) {
        var selectElement = this.shadowRoot.getElementById('shadow-select');
        if (!selectElement) return;
    
        for (var i = selectElement.options.length - 1; i >= 0; i--) {
            var option = selectElement.options[i];
            if (option.value === value) {
                selectElement.remove(i);
            }
        }
        this.selection_count -= 1
        delete this.component_store[value]
    }
}

customElements.define('moradin-selection-store',  SelectionStore);
