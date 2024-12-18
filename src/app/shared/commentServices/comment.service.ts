import { Injectable, signal } from '@angular/core';
import { Comment } from '../../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentSig = signal<Comment[]>([]);

  addComment(id: string, uid:string, pid:string, text:string): void{
    const newComment: Comment = {
      uid: uid,
      pid: pid,
      id:id,
      text: text,
    }

    this.commentSig.update((Comments) => [...Comments, newComment])
  }

  removeComment(id: string): void{
    this.commentSig.update((comments) => comments.filter((comment) =>{ comment.id !== id }))
  }
}
