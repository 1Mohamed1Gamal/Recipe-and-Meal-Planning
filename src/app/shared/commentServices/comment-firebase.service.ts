import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, collectionData, addDoc} from '@angular/fire/firestore';
import { Observable, from} from 'rxjs'
import { Comment } from '../../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentFirebaseService {

  firestore = inject(Firestore)
  commentsCollection = collection(this.firestore, 'comments')

  getComments(): Observable<Comment[]>{
    return collectionData(this.commentsCollection, {
      idField: 'id',
    }) as Observable<Comment[]>;
  }

  addComment(uid:string, text:string, pid:string): Observable<string>{
    const commentToCreat = {uid, text, pid}
    const promis = addDoc(this.commentsCollection, commentToCreat).then(
      (response) => response.id
    )
      return from(promis)
  }
}
