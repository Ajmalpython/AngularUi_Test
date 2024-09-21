import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  message = "";
  RegisterFrom = new FormGroup({
    Name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required)
  })

  constructor(private Router: Router, private http: HttpClient) { }
  Regisetr() {
    this.RegisterFrom.value
    if (!this.isValidEmail(String(this.RegisterFrom.value.email))) {
      this.message = "Please enter a valid email address (e.g., example@example.com).";
      setTimeout(() => {
        this.message = "";
      }, 60000);
      return
    }
    let body = {
      name: this.RegisterFrom.value.Name,
      password: this.RegisterFrom.value.password,
      email: this.RegisterFrom.value.email
    }
    let url = environment.api
    this.http.post(url + "Register/register", body).subscribe((res => {
      console.log(res)

      var data: any
      data = res
      this.message = data.message
      setTimeout(() => {
        this.message = "";
      }, 60000);
    }), (error => {
      console.log(error)
      this.message = "Something went wrong.";
      setTimeout(() => {
        this.message = "";
      }, 60000);
    }))
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  Login() {
    this.Router.navigateByUrl('login')
  }
}
