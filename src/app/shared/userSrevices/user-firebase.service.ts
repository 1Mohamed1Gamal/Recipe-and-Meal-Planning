import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';
import { Observable, from} from 'rxjs'
import { UserState } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserFirebaseService {
  firestore = inject(Firestore)
  usersCollection = collection(this.firestore, 'users')

  getUsers(): Observable<UserState[]>{
    return collectionData(this.usersCollection, {
      idField: 'id',
    }) as Observable<UserState[]>;
  }

  addUsers( email:string, imageURL:string, username:string, uid:string): Observable<string>{
    const userToCreat = {email, imageURL, username, uid}
    const promis = addDoc(this.usersCollection, userToCreat).then(
      (response) => response.id
    )
      return from(promis)
  }

  addPosts(uid:string, postId:string){
    const userRef = doc(this.firestore, 'users', uid);

    // Update the 'likes' field of the specific post
    const updatePromise = updateDoc(userRef, {
      PostsId: arrayUnion(postId) // Adds postId to the 'posts' array
    });
    return from(updatePromise);
  }

  removePost(uid: string, postId: string) {
    const userRef = doc(this.firestore, 'users', uid);
  
    // Update the 'postsId' array in the user document
    const updatePromise = updateDoc(userRef, {
      PostsId: arrayRemove(postId) // Removes postId from the 'postsId' array
    });
  
    // Return an observable for the update operation
    return from(updatePromise);
  }



  addFriend(uid:string, postUid:string){
    const userRef = doc(this.firestore, 'users', uid);

    // Update the 'likes' field of the specific post
    const updatePromise = updateDoc(userRef, {
      userFollow: arrayUnion(postUid) // Adds postId to the 'posts' array
    });
    return from(updatePromise);
  }

  removeFriend(uid:string, postUid:string) {
    const userRef = doc(this.firestore, 'users', uid);
  
    // Update the 'postsId' array in the user document
    const updatePromise = updateDoc(userRef, {
      userFollow: arrayRemove(postUid) // Removes postId from the 'postsId' array
    });
  
    // Return an observable for the update operation
    return from(updatePromise);
  }


  edit(uid:string, username:string, imageURL:string) {
    const userRef = doc(this.firestore, 'users', uid);
  
    // Update the 'postsId' array in the user document
    const updatePromise = updateDoc(userRef, {
      username: username,
      imageURL: imageURL // Removes postId from the 'postsId' array
    });
  
    // Return an observable for the update operation
    return from(updatePromise);
  }
}
