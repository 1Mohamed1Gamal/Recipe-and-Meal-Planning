import { Injectable, inject, signal } from '@angular/core';
import { UserState } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSig = signal<UserState[]>([]);

  addUser(id:string, email:string, imageURL:string, username:string, uid:string, PostsId:Array<string>, userFollow:Array<string> ): void{
    const newUser: UserState = {
      id: id,
      email: email,
      imageURL: imageURL,
      username: username,
      uid:uid,
      PostsId:PostsId,
      userFollow:userFollow
    }

    this.userSig.update((Users) => [...Users, newUser])
  }

  removeUser(id: string): void{
    this.userSig.update((Users) => Users.filter((user) =>{ user.id !== id }))
  }
}
