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
        this.selection_limit=-1
        this.selection_count=0
        this.remove_type=''
        this.unique_options=false
        this.local_storage_parent_key=''
        this.local_storage_sub_key=''
    }

    connectedCallback() {
        this.render();
                // Set up attributes
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
        if (this.hasAttribute('local_storage_parent_key')) {
            this.local_storage_parent_key = this.getAttribute('local_storage_parent_key');
        }
        if (this.hasAttribute('local_storage_sub_key')) {
            this.local_storage_sub_key = this.getAttribute('local_storage_sub_key');
        }
        if (!this.fetchFromLocalStorage(this.local_storage_parent_key)){
            this.saveToLocalStorage(this.local_storage_parent_key, {})
        }
        if (!this.fetchFromLocalStorage(this.local_storage_parent_key).hasOwnProperty(this.local_storage_sub_key)) {
            let data  = this.fetchFromLocalStorage(this.local_storage_parent_key)
            data[this.local_storage_sub_key] = {}
            this.saveToLocalStorage(this.local_storage_parent_key, data)
        }
    }
    fetchFromLocalStorage(id) {
        try {
            const jsonData = localStorage.getItem(id);
            if (jsonData === null) {
                console.log('No data found for the given ID');
                return found;
            }
            return JSON.parse(jsonData);
        } catch (error) {
            console.error('Error fetching data from local storage:', error);
            return found;
        }
    }
    saveToLocalStorage(id, data) {
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(id, jsonData);
            console.log('Data saved successfully');
        } catch (error) {
            console.error('Error saving data to local storage:', error);
        }
    }

    updateLocalStorage(){

    }

    setCharId(){
        const url = window.location.href;
        const urlParams = new URLSearchParams(new URL(url).search);
        this.char_id = urlParams.get(this.char_id_key);
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
            console.log("remove")
            selectElement.remove(selectElement.options.length - 1);
            console.log(this.selection_count)
            this.selection_count =  this.selection_count - 1
            console.log("remove after")
        }
    }

    removeSelectedOptions() {
        var selectElement = this.shadowRoot.getElementById('shadow-select');
        if (!selectElement) return;
    
        for (var i = selectElement.options.length - 1; i >= 0; i--) {
            if (selectElement.options[i].selected) {
                selectElement.remove(i);
                console.log("remove")
                this.selection_count -= 1
            }
        }
    }

    optionExists(optionValue) {
        var selectElement = this.shadowRoot.getElementById('shadow-select');
        if (!selectElement) return false;
    
        for (var i = 0; i < selectElement.options.length; i++) {
            if (selectElement.options[i].value === optionValue) {
                return true;
            }
        }
        return false;
    }

    addOption(data) {
        if(this.selection_limit > 0 && this.selection_count >= this.selection_limit){
            return
        }

        if(this.unique_options && this.optionExists(data.value)){
            return
        }
        const option = document.createElement('option');
        let value = data.value
        if(this.do_index){
            let cur_count = this.selection_count + 1
            value = cur_count + " - " + value
        }
        option.value=value
        option.textContent = value;
        let select = this.shadowRoot.getElementById('shadow-select')
        select.appendChild(option);
        this.selection_count += 1
    }
}

customElements.define('mutant-selection-store',  SelectionStore);
