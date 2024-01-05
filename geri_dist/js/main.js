import { CharacterSheetManager } from '/js/entity/CharacterSheetManager.js'
import { ToDoManager } from '/js/entity/ToDoManager.js';
import { ScreenManager } from '/js/screens/ScreenManager.js'


import { Class } from '/js/screens/Class.js';


import * as util from '/js/util/util.js'

(async () => {
    try {

        // setup state for the application
        window.to_do_manager = new ToDoManager();
        window.char_manager = new CharacterSheetManager();
        window.screen_manager = new ScreenManager();
        

        // setup data for the application 
        window.class_data = await util.fetch_json("/data/json/classes/all_classes.min.json");
        window.race_data = await util.fetch_json("/data/json/races/races.min.json");

        let class_class = new Class();
        class_class.init()


        
        // screen_manager.init()
        

    } 
    catch(err) {
      console.error(err)
    }
})()




document.querySelectorAll('#tableOfContents a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

