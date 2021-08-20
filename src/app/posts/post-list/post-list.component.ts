import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from '../post.module';
import { PostsService } from "../post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
/* Example to test post-list
  posts = [
    {title: "First Post", content: "This is the first post's content"},
    {title: "Second Post", content: "This is the second post's content"},
    {title: "Third Post", content: "This is the third post's content"}
  ]; */
  posts: Post[] = [];
  private postsSubs: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSubs = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSubs.unsubscribe();
  }

}

