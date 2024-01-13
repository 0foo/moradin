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
    }

    render(){
        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                #select-container{
                    max-width:${this.max_width};
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

            </div>
        `;
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
            this.event_emit_name=this.getAttribute('event_emit_name')
        }
        this.render()
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

customElements.define('mutant-select', SelectComponent);
