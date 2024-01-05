import { Screen } from '/js/screens/Screen.js'
import * as util from '/js/util/util.js'

class Race extends Screen{
    constructor(){
        super("Race")
        this.to_dos_i_handle = [
            ["race", "create"]
        ]
    }
    init(){
        super.init();
    }
}

export {
    Race
};