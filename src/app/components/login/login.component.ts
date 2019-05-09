import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  verifyModel = { token: "secretInput" };

  constructor(
    public authService: AuthService,
    private data: DataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.data.changeTitle("Login")
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  username: string;
  password: string;
  token: string = "token";

  async login(){
    this.submitted = true;
    if(this.loginForm.valid){
      this.authService.checkUserCredentials(this.loginForm.value)
      .subscribe((user: User) => {
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.token);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('userRol', user.userRol.name)
        this.router.navigate(['']);
      },
      err => {
        if(err.status == 404){
          alert(`Error user not found please check your credentials`)
        }else{
          alert(`Error code: ${err.status} , message: ${err.statusText}`)
        }
      });
    }
  }

  get f() { return this.loginForm.controls; }
}