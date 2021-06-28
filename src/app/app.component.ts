import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskManagerService } from './services/task-manager.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'time-logger';
  tasks = [];
  taskName = new FormControl('');

  constructor(private taskManager: TaskManagerService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    // this.taskManager.load("[{\"name\":\"OPEX-1011\",\"start\":[\"2021-06-25T05:38:22.650Z\"],\"end\":[\"2021-06-25T06:33:28.028Z\"],\"id\":\"OPEX,1011\"},{\"name\":\"PROD-47277\",\"start\":[\"2021-06-25T07:41:54.566Z\"],\"end\":[\"2021-06-25T07:51:31.973Z\"],\"id\":\"PROD,47277\"},{\"name\":\"PROD-47237\",\"start\":[\"2021-06-25T07:51:37.769Z\",\"2021-06-25T10:06:27.152Z\",\"2021-06-25T11:51:15.110Z\",\"2021-06-25T12:02:34.819Z\"],\"end\":[\"2021-06-25T09:41:20.639Z\",\"2021-06-25T11:19:19.047Z\",\"2021-06-25T12:02:26.290Z\"],\"id\":\"PROD,47237\"},{\"name\":\"PROD-42803\",\"start\":[\"2021-06-25T09:41:23.910Z\"],\"end\":[\"2021-06-25T10:06:25.674Z\"],\"id\":\"PROD,42803\"},{\"name\":\"PROD-48009\",\"start\":[\"2021-06-25T11:19:25.747Z\",\"2021-06-25T12:02:24.837Z\"],\"end\":[\"2021-06-25T11:45:02.098Z\",\"2021-06-25T12:13:19.986Z\"],\"id\":\"PROD,48009\"}]");
    this.tasks = this.taskManager.getAllTask();
  }

  addTask() {
    console.log(this.taskName.value);
    this.taskManager.add(this.taskName.value);
  }

  startWork(indexOfelement){
    this.taskManager.startWork(indexOfelement);
    this.tasks[indexOfelement] = this.taskManager.getTask(indexOfelement);
    console.log(this.tasks[indexOfelement]);
  }
  stopWork(indexOfelement){
    this.taskManager.stopWork(indexOfelement);
    this.tasks[indexOfelement] = this.taskManager.getTask(indexOfelement);
    this.tasks[indexOfelement].calculateTimeSpent();
    console.log(this.tasks[indexOfelement]);
  }
  
  clearCache(){
    if(confirm('This will wipe out all the records. Are you sure?')){
      this.taskManager.cleanTask();
      this._snackBar.open('Storage clean', 'Close');
      this.taskManager = new TaskManagerService();
      this.tasks = this.taskManager.getAllTask();
    }
  }

  openShortWindow(){
    window.open(window.location.href,'popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
  }
}
