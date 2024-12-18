import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../shared/authServices/auth.service';
import { UserFirebaseService } from '../shared/userSrevices/user-firebase.service';
import { UserService } from '../shared/userSrevices/user.service';
import { FormsModule } from '@angular/forms';

import { PostService } from '../shared/postServices/post.service'
import { PostsFirebaseService } from '../shared/postServices/posts-firebase.service';

import { CommentService } from '../shared/commentServices/comment.service'
import { CommentFirebaseService } from '../shared/commentServices/comment-firebase.service';
import { PostDetailComponent } from '../components/post-detail/post-detail.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, PostDetailComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  auth = inject(AuthService)
  userFirebaseService = inject(UserFirebaseService)
  userService = inject(UserService)
  username = signal<string>('')
  imageURL = signal<string>('')

  postFirebase = inject(PostsFirebaseService)
  postService = inject(PostService)
  
  commentFirebaseService = inject(CommentFirebaseService)
  commentService = inject(CommentService)




  ngOnInit(): void {
    this.userFirebaseService.getUsers().subscribe((users)=>{
      this.userService.userSig.set(users)
    })
    this.postFirebase.getPosts().subscribe((posts)=>{
      this.postService.postSig.set(posts)
    })

    this.commentFirebaseService.getComments().subscribe((comments)=>{
      this.commentService.commentSig.set(comments)

    })
  }


  onUploadClick(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  // Handle file selection for the main upload button
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.userFirebaseService.edit(this.auth.currentUser()?.id!,  this.auth.currentUser()?.username!, e.target?.result as string).subscribe(()=>{
          this.imageURL.set(e.target?.result as string)
          this.auth.currentUser.set({
            email: this.auth.currentUser()?.email!,
            id: this.auth.currentUser()?.id!,
            imageURL: this.imageURL(),
            uid: this.auth.currentUser()?.email!,
            PostsId: this.auth.currentUser()?.PostsId!,
            userFollow: this.auth.currentUser()?.userFollow!,
            username: this.auth.currentUser()?.username!
          })
        })
      };
      reader.readAsDataURL(file);
    }
  }

  
  edit(){
    this.userFirebaseService.edit(this.auth.currentUser()?.id!, this.username(), this.auth.currentUser()?.imageURL!).subscribe(()=>{
      this.auth.currentUser.set({
        email: this.auth.currentUser()?.email!,
        id: this.auth.currentUser()?.id!,
        imageURL: this.auth.currentUser()?.imageURL!,
        uid: this.auth.currentUser()?.email!,
        PostsId: this.auth.currentUser()?.PostsId!,
        userFollow: this.auth.currentUser()?.userFollow!,
        username: this.username()
      })
    })
  }
  

  deletebutton(uid : string): void {
    this.userFirebaseService.removeFriend(this.auth.currentUser()?.id!, uid)
  }
}
