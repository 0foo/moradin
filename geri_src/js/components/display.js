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
