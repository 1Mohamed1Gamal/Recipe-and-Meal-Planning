import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { AuthService } from "./shared/authServices/auth.service"
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {UserFirebaseService} from "./shared/userSrevices/user-firebase.service"
import {UserService} from "./shared/userSrevices/user.service"

import {CommentFirebaseService} from "./shared/commentServices/comment-firebase.service"
import {CommentService} from "./shared/commentServices/comment.service"

import {PostsFirebaseService} from "./shared/postServices/posts-firebase.service"
import {PostService} from "./shared/postServices/post.service"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Food Site';
  authService = inject(AuthService)
  userFirebaseService = inject(UserFirebaseService)
  userService = inject(UserService)
  register = true
  commentFirebaseService = inject(CommentFirebaseService)
  commentService = inject(CommentService)

  postsFirebaseService = inject(PostsFirebaseService)
  postService = inject(PostService)

  ngOnInit(): void {
      this.authService.user$.subscribe((user)=>{
        this.userFirebaseService.getUsers().subscribe((users)=>{
          if(user){
            this.userService.userSig.set(users)
            for(let userr of this.userService.userSig()){
              if(userr.uid === user.uid){
                this.authService.currentUser.set({
                  email: userr.email!,
                  username: userr.username!,
                  id: userr.id,
                  imageURL: userr.imageURL!,
                  uid: userr.uid,
                  PostsId: userr.PostsId,
                  userFollow: userr.userFollow 
                })
              }
            }
          }else{
            this.authService.currentUser.set(null)
          }
          console.log(this.authService.currentUser())
        })
      })
      
      this.postsFirebaseService.getPosts().subscribe((posts)=>{
        this.postService.postSig.set(posts)
      })


  }
}
