class ToDoManager{
    constructor(){
        this.queue = []
    }
    push(item){
        this.queue.push(item)
    }
    push_list(item_list){
        this.queue.push(...item_list);
    }
    get(subject,action){
        let out = this.queue.find(obj => obj.subject === subject && obj.action === action);
        if (out === undefined) {
            return {}
        } else {
            return out
        }
    }
    has(subject, action){
        let has = this.get(subject, action);
        if( has.isEmpty() ){
            return false;
        }
        return true;
    }
    all(){
        return this.queue
    }
}

export{
    ToDoManager
};