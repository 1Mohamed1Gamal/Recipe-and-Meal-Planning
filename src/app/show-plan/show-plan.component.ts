import { Component, OnInit, inject, input, signal } from '@angular/core';
import {PostDetailComponent} from "../components/post-detail/post-detail.component"

import {PostsFirebaseService} from "../shared/postServices/posts-firebase.service"
import {PostService} from "../shared/postServices/post.service"

import {CommentFirebaseService} from "../shared/commentServices/comment-firebase.service"
import {CommentService} from "../shared/commentServices/comment.service"

import {PlanFirebaseService} from "../shared/planServices/plan-firebase.service"
import {PlanService} from "../shared/planServices/plan.service"

import {UserFirebaseService} from "../shared/userSrevices/user-firebase.service"
import {UserService} from "../shared/userSrevices/user.service"
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-show-plan',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './show-plan.component.html',
  styleUrl: './show-plan.component.css'
})

export class ShowPlanComponent implements OnInit{
  postFirebase = inject(PostsFirebaseService)
  postService = inject(PostService)
  
  commentFirebaseService = inject(CommentFirebaseService)
  commentService = inject(CommentService)

  planFirebaseService = inject(PlanFirebaseService)
  planService = inject(PlanService)

  userFirebaseService = inject(UserFirebaseService)
  userService = inject(UserService)

  day = signal<string>('')

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

    this.planFirebaseService.getPlans().subscribe((plans)=>{
      this.planService.plansSig.set(plans)
    })
  }

  setDay(day:string){
    this.day.set(day)
  }
}
