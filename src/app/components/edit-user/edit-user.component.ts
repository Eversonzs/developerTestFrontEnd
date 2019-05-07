import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserRoles } from 'src/app/models/UserRoles';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { UserService } from 'src/app/user.service';
import { UserRolesService } from 'src/app/user-roles.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userId: number;
  editForm: FormGroup;
  submitted: boolean = false;
  user: User;
  userRoles: UserRoles;
  username: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userRolesService: UserRolesService
  ) { }

  ngOnInit() {
    this.data.changeTitle("Edit user")

    this.userRolesService.getUserRoles().subscribe((data: UserRoles) => {
      this.userRoles = data;
    })

    this.editForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      userRol: ['', Validators.required],
    });

    this.route.queryParams
      .subscribe(params => {
        let userId = params['userId'];
        if(!userId){
          this.router.navigate(['']);
        }
        this.userId = userId;
        this.userService.getUser(userId).subscribe((user: User) => {
          user.userRol = user.userRol;
          this.username = user.username;
          this.editForm.patchValue(user);
        })
      })
  }

  onSubmit(){
    this.submitted = true;

    if(this.editForm.valid){
      this.userService.editUser(this.editForm.value)
      .subscribe(data => {
        this.router.navigate(['users']);
      },
      err => {
        alert(`Error: ${err.error.message}`);
      })
      
    }
  }

  get f() { return this.editForm.controls; }

}