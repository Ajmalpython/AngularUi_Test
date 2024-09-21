import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  message = "";
  url = environment.api
  constructor(private router: Router, private http: HttpClient) { }



  ngOnInit() {
localStorage.clear();
  }

  Login() {
    this.loginForm.value
    let body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.http.post(this.url + "Register/login", body).subscribe((res => {
      console.log(res)
      let apires: any
      apires = res
      this.message = apires.message
     
    
      if(this.message=="Success"){
        this.message="";
        localStorage.setItem("token",apires.data.token)
        localStorage.setItem("userid",apires.data.userid)
        localStorage.setItem("DispalyName",apires.data.name)
        this.router.navigateByUrl('home')
      }
      setTimeout(() => {
        this.message = "";
      }, 60000);
    }), (error => {
      console.log(error)
      this.message="Something went wrong.";
      setTimeout(() => {
        this.message = "";
      }, 60000);
    }))
  }

  GoRegister() {
    this.router.navigateByUrl('register')
  }
}
