import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserRolesListComponent } from './components/user-roles-list/user-roles-list.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-post',
    component: AddPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-post',
    component: EditPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-user',
    component: EditUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-roles',
    component: UserRolesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-category',
    component: CreateCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-category',
    component: EditCategoryComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
