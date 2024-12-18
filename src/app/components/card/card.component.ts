import { Component,inject, input, signal } from '@angular/core';
import {Post} from "../../model/post"
import {AuthService} from "../../shared/authServices/auth.service"

import {UserFirebaseService} from "../../shared/userSrevices/user-firebase.service"
import { FormsModule } from '@angular/forms';
import { Comment } from '../../model/comment';
import { UserState } from '../../model/user';
import { PostsFirebaseService } from '../../shared/postServices/posts-firebase.service';
import { PlanService } from '../../shared/planServices/plan.service'
import { PlanFirebaseService } from '../../shared/planServices/plan-firebase.service'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {
  post = input<Post>();
  comments = input<Comment[]>();
  users = input<UserState[]>();
  day = input<string>('');

  auth = inject(AuthService);
  planService = inject(PlanService);
  planFirebaseService = inject(PlanFirebaseService);
  userFirebaseService = inject(UserFirebaseService);
  postsFirebaseService = inject(PostsFirebaseService);



  addInPlan(){
    this.planFirebaseService.addPlan(this.auth.currentUser()?.id!, this.day(), this.post()?.id!).subscribe(()=>{
      console.log('Add plan succefully')
    })
  }
}
