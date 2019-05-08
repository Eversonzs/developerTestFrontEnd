import { Component, OnInit } from '@angular/core';
import { UserRoles } from 'src/app/models/UserRoles';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { UserRolesService } from 'src/app/user-roles.service';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userRoles: UserRoles;
  createForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private data: DataService,
    private userRolesService: UserRolesService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.data.changeTitle("Create new User")
    this.userRolesService.getUserRoles().subscribe((data: UserRoles) => {
      this.userRoles = data;
    })

    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      userRol: ['', Validators.required],
    });
  }

  onSubmit(){
    this.submitted = true;

    if(this.createForm.valid){
      this.userService.createUser(this.createForm.value)
      .subscribe(data => {
        this.router.navigate(['/users']);
      });
    }
  }

  get f() { return this.createForm.controls; }

}