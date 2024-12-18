import { Component, OnInit, inject, input, signal } from '@angular/core';
import {PostDetailComponent} from "../components/post-detail/post-detail.component"

import {PostsFirebaseService} from "../shared/postServices/posts-firebase.service"
import {PostService} from "../shared/postServices/post.service"

import {CommentFirebaseService} from "../shared/commentServices/comment-firebase.service"
import {CommentService} from "../shared/commentServices/comment.service"

import {UserFirebaseService} from "../shared/userSrevices/user-firebase.service"
import {UserService} from "../shared/userSrevices/user.service"
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})

export class PlanComponent implements OnInit{
  day = signal('sunday')

  postFirebase = inject(PostsFirebaseService)
  postService = inject(PostService)
  
  commentFirebaseService = inject(CommentFirebaseService)
  commentService = inject(CommentService)

  userFirebaseService = inject(UserFirebaseService)
  userService = inject(UserService)


  ngOnInit() {
    this.postFirebase.getPosts().subscribe((posts)=>{
      this.postService.postSig.set(posts)
    })

    this.commentFirebaseService.getComments().subscribe((comments)=>{
      this.commentService.commentSig.set(comments)

    })

    this.userFirebaseService.getUsers().subscribe((users)=>{
      this.userService.userSig.set(users)
    })
  }

  setDay(dayName:string){
    this.day.set(dayName)
  }
}
