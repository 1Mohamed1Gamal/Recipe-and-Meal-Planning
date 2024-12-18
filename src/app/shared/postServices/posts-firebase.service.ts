import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable, from} from 'rxjs'
import { Post } from '../../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostsFirebaseService {

  firestore = inject(Firestore)
  postsCollection = collection(this.firestore, 'posts')
  commentsID = signal<string[]>([''])

  getPosts(): Observable<Post[]>{
    return collectionData(this.postsCollection, {
      idField: 'id',
    }) as Observable<Post[]>;
  }

  addPost(recipy: string, ingradients: string, uid: string, imageURL: string, name: string, review: number, category: string, cuisine: string, likes:number): Observable<string>{
    const postToCreat = {recipy, ingradients, uid, imageURL, name, review, cuisine, category, likes}
    const promis = addDoc(this.postsCollection, postToCreat).then(
      (response) => response.id
    )
      return from(promis)
  }

 // Update the likes of a post
  updatePost(postId: string, likes: number): Observable<void> {
    // Get reference to the post document by its ID
    const postRef = doc(this.firestore, 'posts', postId);

    // Update the 'likes' field of the specific post
    const updatePromise = updateDoc(postRef, {
      likes: likes, // Update likes value
    });

    return from(updatePromise);
  }

}
