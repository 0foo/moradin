
class ToDo{
    constructor(subject=null,action=null){
        this.subject = subject
        this.action = action
        this.data_queue = []
        this.completed = false
        this.result =  null
    }
}


export {
    ToDo
};