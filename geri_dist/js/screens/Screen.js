import * as util from '/js/util/util.js'

class Screen{
    constructor(css_suffix){
        this.nav_element=css_suffix + "-Nav";
        this.screen_element = css_suffix + "-Screen"
        this.to_dos_i_handle=[]
    }
    hide_screen(){
        util.hide_element_by_id(this.nav_element)
        util.hide_element_by_id(this.screen_element)
    }
    show_screen(){
        util.show_element_by_id(this.nav_element)
        util.show_element_by_id(this.screen_element)
    }
    init(){
        this.to_dos_i_handle.some( (item) => {
           let has = window.to_do_manager.has(item[0], item[1])
           if(has){
                this.show_screen();
                return true;
           }
        })
    }
}

export {
    Screen
};