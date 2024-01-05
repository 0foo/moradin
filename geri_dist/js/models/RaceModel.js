class RaceModel{
    constructor(){ 
        this.race_data=window.race_data
    }
    get_names(){
        let names = window.race_data.race.map(item=>  item.name + "-" + item.source)
        // can add some filtring here down the line if needed
        return names
    }
}
class RaceFluffModel{
    constructor(){
        this.race_data=JSON.parse("/data/races.min.json")
    }
    get_names(){
        let names = this.race_data.race.map(item=>item.name)
        // can add some filtring here down the line if needed
        return names
    }
} 
