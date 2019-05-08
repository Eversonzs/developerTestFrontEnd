import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe( (categories: Category[]) => {
      this.categories = categories;
    })
  }

  editCategory(categoryId){
    this.router.navigate(['/edit-category'], { queryParams: { categoryId: categoryId } });
  }

  deleteCategory(categoryId){
    let userRolLogged = localStorage.getItem('userRol');
    if(userRolLogged == "viewer"){
      alert("You are a viewer user, you don't have grants to delete categories.");
      this.router.navigate(['/categories']);
    }else{
      this.categoryService.deleteCategory(categoryId).subscribe( () =>{
        const categoryIndex = this.categories.findIndex((category) => category.id === categoryId);
        this.categories.splice(categoryIndex, 1);
      })
    }
  }

}