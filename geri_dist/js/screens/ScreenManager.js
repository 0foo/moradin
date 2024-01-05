import { Class } from '/js/screens/Class.js';
import { Race } from '/js/screens/Race.js';

class ScreenManager{
    constructor(){
        this.screens = {
            "class": new Class(),
            "race": new Race()
        }
    }
    init(){
        Object.keys(this.screens).forEach(key => {
            this.screens[key].init()
        });
    }

    update(){
        Object.keys(this.screens).forEach(key => {
            this.screens[key].update()
        });
    }
}

export{
    ScreenManager
};