import { Screen } from '/js/screens/Screen.js'
// import { ClassView } from '/js/views/ClassView.js'
import * as util from '/js/util/util.js'

class Class extends Screen{
    constructor(){
        super("Class")
        this.to_dos_i_handle = [
            ["class", "create"]
        ]
    }
    init(){
        super.init();
        let selectButton = document.getElementById('class-select-button');
        selectButton.addEventListener('click', this.handle_confirm_button_click.bind(this) );
        let selectBox = document.getElementById('class-select-box');
        selectBox.addEventListener('change', this.handle_select_box_onchange);
    }

    async handle_select_box_onchange(event){
        console.log(event.target.value)
        let the_class = event.target.value.toLowerCase()
        let the_file=`/data/views/classes/${the_class}.html`
        let the_html = await util.fetch_text(the_file)
        document.getElementById('class-description-container').innerHTML = the_html;
    }

    handle_confirm_button_click(){
        this.update_create_to_do_data()
    }

    update_create_to_do_data(){
        // let create_to_do = window.to_do_manager.get("class","create")
        let create_to_do= window.to_do_manager.get("class","create")

        let select_box = document.getElementById('class-select-box');
        select_box.disabled=true
        create_to_do.data_queue.push(
            {
                "class": select_box.value,
                "level": 1
            }
        )
        console.log(window.to_do_manager)
    }
}

export {
    Class
};
