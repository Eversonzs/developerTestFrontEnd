import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[];
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    let userRolLogged = localStorage.getItem('userRol');
    if(userRolLogged != "admin"){
      alert("Only admins have access to users.");
      this.router.navigate(['']);
    }else{
      this.userService.getUsers().subscribe((users: User[]) => {
        this.users = users;
      });
    }
  }

  editUser(userId){
    this.router.navigate(['/edit-user'], {queryParams: {userId: userId} });
  }

  deleteUser(userId){
    this.userService.deleteUser(userId).subscribe( () =>{
      const userIndex = this.users.findIndex( (user) => user.id === userId);
        this.users.splice(userIndex, 1);
    })
  }

}
