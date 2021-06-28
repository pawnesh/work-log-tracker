import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
    providedIn: 'root'
})

export class TaskManagerService {

    constructor() {
        var data = localStorage.getItem('records');
        if(data){
            this.load(data);
        }
    }

    cleanTask(){
        localStorage.clear();
    }

    tasks = [];
    add = function (value) {
        if (!value.length) {
            console.log('empty string');
            return;
        }

        var _task = new Task(value);
        this.tasks.push(_task);
        return (this.tasks.length - 1);
    }
    getAllTask = function () {
        return this.tasks;
    }
    getTask = function (index) {
        return this.tasks[index];
    }
    startWork = index => {
        this.tasks[index].startWork();
        this.saveInStorage();
    }
    stopWork = index => {
        this.tasks[index].stopWork();
        this.saveInStorage();
    }
    
    load = function (jsonText) {
        var tasks = JSON.parse(jsonText);
        for (var i = 0; i < tasks.length; i++) {
            var index = this.add(tasks[i].name);
            this.tasks[index].start = this.converStringToDate(tasks[i].start);
            this.tasks[index].end = this.converStringToDate(tasks[i].end);

            this.tasks[index].calculateTimeSpent();
        }
    }

    converStringToDate(array) {
        var temp = [];
        array.forEach(element => {
            temp.push(new Date(element));
        });
        return temp;
    }

    saveInStorage() {
        localStorage.setItem('records', JSON.stringify(this.tasks));
    }
}
