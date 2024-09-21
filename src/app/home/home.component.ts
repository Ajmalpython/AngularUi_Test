import { Component, Input, SimpleChanges } from '@angular/core';
import { Task, TaskList } from '../Dtos/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks: Task[] = [];
  istaskempty: boolean = false;
  isDescriptionempty: boolean = false;
  userid = localStorage.getItem('userid')
  token = localStorage.getItem('token')
  DispalyName = localStorage.getItem('DispalyName')
  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0], // Format as 'yyyy-MM-dd'
    status: 'incomplete',
    userid: 0
  };

  isEditing = false;
  url = environment.api;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit() {
    this.GetAllTask();
  }

  logout() {
    this.route.navigateByUrl('logout')
  }

  GetAllTask() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Adjust if your API expects a different content type
      'Authorization': `Bearer ${this.token}`  // Set your token here
    });
    this.http.get(this.url + "Task/" + this.userid, { headers }).subscribe
      ((res => {

        console.log(res)
        let data: any
        data = res;
        if (data.message === "Success") {
          console.log(data.data)
          this.tasks = data.data
        }

      }),
        (err => {
          console.log(err)

          if (err.statusText == "Unauthorized") {
            this.route.navigateByUrl('login')
          }
        })
      )
  }


  addTask(): void {
    if ({ ...this.newTask }.title === '') {
      this.istaskempty = true;
    } if ({ ...this.newTask }.description === '') {
      this.isDescriptionempty = true;
    }
    if ({ ...this.newTask }.title === '' || { ...this.newTask }.description === '') {
      return
    }
    let taskid = null;
    if (this.isEditing) {
      taskid = this.newTask.id
    }

    let body = {
      "taskId": taskid,
      "title": { ...this.newTask }.title,
      "description": { ...this.newTask }.description,
      "dueDate": { ...this.newTask }.dueDate,
      "status": { ...this.newTask }.status,
      "userId": Number(this.userid)
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Adjust if your API expects a different content type
      'Authorization': `Bearer ${this.token}`  // Set your token here
    });
    this.http.post(this.url + "Task", body, { headers }).subscribe((res => {
      console.log(res)
      this.GetAllTask();
    }), (err => {
      console.log(err)
    }))


    this.resetForm();
  }

  editTask(task: any): void {

    let editdata = { ...task };
    console.log(editdata)
    this.newTask.id = editdata.taskId
    this.newTask.title = editdata.title
    this.newTask.description = editdata.description
    this.newTask.dueDate = editdata.dueDate.split('T')[0]
    this.newTask.status = editdata.status
    this.newTask.userid = editdata.userId
    this.isDescriptionempty = false;
    this.istaskempty = false;
    this.isEditing = true;

  }

  deleteTask(task: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Adjust if your API expects a different content type
      'Authorization': `Bearer ${this.token}`  // Set your token here
    });
    let taskId =task.taskId;
    this.http.delete(this.url + "Task/" + taskId, { headers }).subscribe((res => {
      console.log(res)
      this.GetAllTask();
    }), (err => {
      console.log(err)
    }))
  }

  resetForm(): void {
    this.isEditing = false;
    this.newTask = { id: 0, title: '', description: '', dueDate: new Date().toISOString().split('T')[0], status: 'incomplete', userid: 0 };
  }






}
