class TaskManager {
    tasks = [];
    add = function(value){
        if(!value.length){
            console.log('empty string');
            return;
        }

        var _task = new Task(value);
        this.tasks.push(_task);
        return (this.tasks.length - 1);
    }
    getAllTask = function(){
        return this.tasks;
    }
    getTask = function(index){
        return this.tasks[index];
    }
    startWork = index => {
        this.tasks[index].startWork();
    }
    stopWork = index => {
        this.tasks[index].stopWork();
    }
    addView = function(index){
        var task = this.tasks[index];
        if(document.getElementById('task-'+task.id)){
            console.log('skipping adding task');
           return; 
        }
        var output = document.getElementById('output');
        console.log(task);
        var timeTakenText = getTimeSpentText(task.getTimeSpent());

        var html = '<div class="row" id="task-'+task.id+'">';
        html += '<div class="com"><strong>'+task.name+'</strong></div>';
        html += '<button class="com" type="button" onclick="track('+index+', this)">Start</button>'
        html += '<div class="com" id="'+index+'-log">'+timeTakenText+'</div>';
        html += '</div>';
        output.innerHTML += html;
    }
    load = function(jsonText){
        var tasks = JSON.parse(jsonText);
        for(var i=0; i< tasks.length; i++){
            var index = this.add(tasks[i].name);
            this.tasks[index].start = this.converStringToDate(tasks[i].start);
            this.tasks[index].end = this.converStringToDate(tasks[i].end);
            this.addView(i);
        }
    }

    converStringToDate(array){
        var temp = [];
        array.forEach(element => {
            temp.push(new Date(element));
        });
        return temp;
    }
    getTaskInString(){
        return JSON.stringify(this.tasks);
    }

}

class Task{
    name = "";
    start = [];
    end = [];
    id = "";
    constructor(name){
        this.name = name;
        name = this.replace(name, ' ');
        name = this.replace(name, '-');
        this.id = name;
    }
    replace(text, toReplace){
        text = text.split(toReplace);
        return text.join();
    }
    getTimeSpent = function(){
        if(this.start.length == 0){
            console.log('lenght is zero');
            return 0;
        }
        var minutes = 0;
        for(var i=0; i< this.start.length; i++){
            var timeTaken = this.start[i].getTime();
            if(this.end[i]){
                timeTaken = this.end[i].getTime() - timeTaken; 
                minutes += timeTaken;
            }
        }
        minutes = (minutes/1000)/60;
        // minutes = minutes/1000;
        return minutes;
    }
    startWork = function(){
        this.start.push(new Date());
    }
    stopWork = function(){
        this.end.push(new Date());
    }
}


var object = "";
var taskManager = new TaskManager();

window.onload = function(){
    taskManager.load("[{\"name\":\"OPEX-1011\",\"start\":[\"2021-06-25T05:38:22.650Z\"],\"end\":[\"2021-06-25T06:33:28.028Z\"],\"id\":\"OPEX,1011\"}]");
    
    document.getElementById('add').onclick = function(){
        addTask();
    }
};

function addTask(){
    var value = document.getElementById('task').value;
    document.getElementById('task').value = '';
    console.log('added '+value);
    var index = taskManager.add(value);
    taskManager.addView(index);
}


function track(index, element){

    if(element.textContent == 'Start'){
        taskManager.startWork(index);
        element.textContent = 'Stop';
    }else if(element.textContent == 'Stop'){
        taskManager.stopWork(index);
        element.textContent = 'Start';
    }
    var el = document.getElementById(index+'-log');
    el.textContent = getTimeSpentText(taskManager.getTask(index).getTimeSpent());
    console.log(taskManager.getAllTask());
}

function getTimeSpentText(time){
    time = Math.round(time);
    return 'Working Time: '+time+' minutes';
}