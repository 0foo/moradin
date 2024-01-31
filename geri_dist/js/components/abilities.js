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
    }

    updateInput(event){
        const elementId = event.target.id;
        const elementValue = event.target.value;
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
