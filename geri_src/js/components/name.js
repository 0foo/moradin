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
