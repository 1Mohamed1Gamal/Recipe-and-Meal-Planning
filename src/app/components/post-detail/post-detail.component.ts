import { Component,inject, input, signal } from '@angular/core';
import {Post} from "../../model/post"
import {AuthService} from "../../shared/authServices/auth.service"
import { NgFor } from '@angular/common';
import {UserService} from "../../shared/userSrevices/user.service"
import {CommentService} from "../../shared/commentServices/comment.service"
import {CommentFirebaseService} from "../../shared/commentServices/comment-firebase.service"
import {UserFirebaseService} from "../../shared/userSrevices/user-firebase.service"
import { FormsModule } from '@angular/forms';
import { Comment } from '../../model/comment';
import { UserState } from '../../model/user';
import { PostsFirebaseService } from '../../shared/postServices/posts-firebase.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})

export class PostDetailComponent{
  post = input<Post>();
  comments = input<Comment[]>();
  users = input<UserState[]>();
  buttonText: string = "unfollow";
  buttonColor: string = "#ff4d4d";
  auth = inject(AuthService);
  userFirebaseService = inject(UserFirebaseService);
  commentService = inject(CommentService);
  commentFirebaseService = inject(CommentFirebaseService);
  postsFirebaseService = inject(PostsFirebaseService);
  flag2 = signal<boolean>(true)
  flag3 = signal<boolean>(true)
  flag1 = signal<boolean>(true)

  text = signal<string>('')


  addComment(){
    this.commentFirebaseService.addComment(this.auth.currentUser()?.uid!, this.text(), this.post()?.id!).subscribe((commentId) =>{
      this.text.set('')
    })

  }

  addLike(){
    if(this.flag2()){
      this.postsFirebaseService.updatePost(this.post()?.id!, this.post()?.likes! + 1)
      this.flag2.set(false)
    }else{
      this.flag2.set(true)
      this.postsFirebaseService.updatePost(this.post()?.id!, this.post()?.likes! - 1)
    }
  }

  addPost(){
    for(const user of this.users()!){
      if(user.uid === this.auth.currentUser()?.uid){
          if(this.flag1()){
          this.flag1.set(false)
          this.userFirebaseService.addPosts(user.id, this.post()?.id!)
        }
        else{
          this.flag1.set(true)
          this.userFirebaseService.removePost(user.id, this.post()?.id!)
        }
      }
    }
  }
  deletebutton(): void {
    for(const user of this.users()!){
      if(user.uid ===this.auth.currentUser()?.uid ){
        if(this.flag3()){
          this.flag3.set(false)
          this.userFirebaseService.addFriend(user.id, this.post()?.uid!)
        }else{
          this.flag3.set(true)
          this.userFirebaseService.removeFriend(user.id, this.post()?.uid!)
        }
      }
    }
}
unfollow():void{
  if (this.buttonText === "unfollow") {
    this.buttonText = "Followed";  // Change text when clicked
    this.buttonColor = "#ffffff";  // Change color when clicked
  } else {
    this.buttonText = "Unfollow";  // Revert text when clicked again
    this.buttonColor = "#ff4d4d";  // Revert color
  }

}
}



