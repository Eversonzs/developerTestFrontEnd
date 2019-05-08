import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoryId: number;
  editForm: FormGroup;
  submitted: boolean = false;
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    let userRolLogged = localStorage.getItem('userRol');
    if(userRolLogged == "viewer"){
      alert("You are a viewer user, you don't have grants to edit categories.");
      this.router.navigate(['/categories']);
    }else{
      this.data.changeTitle("Edit Category")
      
      this.editForm = this.formBuilder.group({
        id: [],
        name: ['', Validators.required]
      });

      this.route.queryParams
      .subscribe(params => {
        let categoryId = params['categoryId'];
        if(!categoryId){
          this.router.navigate(['/categories'])
        }
        this.categoryId = categoryId;
        this.categoryService.getCategory(categoryId).subscribe( (category: Category) => {
          this.editForm.patchValue(category);
        })
      })
    }
  }

  onSubmit(){
    this.submitted = true;
    let userRolLogged = localStorage.getItem('userRol');
    if(userRolLogged == "admin" || userRolLogged == "editor"){
      if(this.editForm.valid){
        this.categoryService.editCategory(this.editForm.value)
        .subscribe( data => {
          this.router.navigate(['/categories']);
        });
      }
    }else{
      alert("You are a viewer user, you don't have grants to edit categories.");
      this.router.navigate(['']);
    }
  }

  get f() { return this.editForm.controls; }

}
