import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  createForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private data: DataService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.data.changeTitle("Create a new category")
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;

    if(this.createForm.valid){
      this.categoryService.createCategory(this.createForm.value)
      .subscribe( data => {
        this.router.navigate(['/categories']);
      })
    }
  }
  get f() { return this.createForm.controls; }
}
