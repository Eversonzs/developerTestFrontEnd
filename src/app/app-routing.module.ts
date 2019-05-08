import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-post',
    component: AddPostComponent
  },
  {
    path: 'edit-post',
    component: EditPostComponent
  },
  {
    path: 'users',
    component: UsersListComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  {
    path: 'edit-user',
    component: EditUserComponent
  },
  {
    path: 'user-roles',
    component: UserRolesListComponent
  },
  {
    path: 'categories',
    component: CategoriesListComponent
  },
  {
    path: 'create-category',
    component: CreateCategoryComponent
  },
  {
    path: 'edit-category',
    component: EditCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
