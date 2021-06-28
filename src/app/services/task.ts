import { Injectable } from '@angular/core';


export class Task{
    name = "";
    start = [];
    end = [];
    id = "";
    timeSpent = 0;
    constructor(name){
        this.name = name;
        name = this.replace(name, ' ');
        name = this.replace(name, '-');
        name = this.replace(name, '/');
        name = this.replace(name, ':');
        this.id = name;
    }
    replace(text, toReplace){
        text = text.split(toReplace);
        return text.join();
    }
    calculateTimeSpent = function(){
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
        this.timeSpent = Math.round(minutes);
    }
    startWork = function(){
        this.start.push(new Date());
    }
    stopWork = function(){
        this.end.push(new Date());
    }
  }
  