import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-lists',
  templateUrl: './posts-lists.component.html',
  styleUrls: ['./posts-lists.component.scss']
})
export class PostsListsComponent implements OnInit {
  posts: Post[];

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.postService.getPosts().subscribe( (posts: Post[]) => {
      this.posts = posts;
    });
  }

  editPost(postId){
    this.router.navigate(['/edit-post'], { queryParams: { postId: postId } });
  }

  deletePost(postId){
    let userRolLogged = localStorage.getItem('userRol');
    if(userRolLogged == "viewer"){
      alert("You are a viewer user, you don't have grants to delete posts.");
      this.router.navigate(['']);
    }else{
      this.postService.deletePost(postId).subscribe( () => {
        const postIndex = this.posts.findIndex( (post) => post.id === postId);
        this.posts.splice(postIndex, 1);
      });
    }
  }

}