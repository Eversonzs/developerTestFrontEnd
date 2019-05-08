import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/post.service';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/models/Category';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  postId: number;
  editForm: FormGroup;
  submitted: boolean = false;
  post: Post;
  categories: Category[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    let userRolLogged = localStorage.getItem('userRol');
    if(userRolLogged == "viewer"){
      alert("You are a viewer user, you don't have grants to edit post.");
      this.router.navigate(['']);
    }else{
      this.data.changeTitle("Edit Post")

      this.categoryService.getCategories().subscribe((data: Category[]) => {
        this.categories = data;
      });

      this.editForm = this.formBuilder.group({
        id: [],
        title: ['', Validators.required],
        text: ['', Validators.required],
        categories: ['', Validators.required]
      });

      this.route.queryParams
        .subscribe(params => {
          let postId = params['postId'];
          if (!postId) {
            this.router.navigate(['']);
          }
          this.postId = postId;
          this.postService.getPost(postId).subscribe( (post: Post) => {
            post.categories = post.categories.map( (category: Category) => {
              return category.id;
            })
            this.editForm.patchValue(post);
          })
        });
      }
  }

  onSubmit(){
    this.submitted = true;
    
    if(this.editForm.valid){
      let userRolLogged = localStorage.getItem('userRol');
      if(userRolLogged == "admin" || userRolLogged == "editor"){
        this.postService.editPost(this.editForm.value)
        .subscribe( data => {
          this.router.navigate(['']);
        });
      }else{
        alert("You are a viewer user, you don't have grants to edit post.");
        this.router.navigate(['']);
      }
    }
  }

  get f() { return this.editForm.controls; }

}
