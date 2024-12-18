import { Injectable, inject, signal } from '@angular/core';
import { Post } from '../../model/post';


@Injectable({
  providedIn: 'root'
})

export class PostService {
  postSig = signal<Post[]>([]);

  addPost(recipy: string, ingradients: string, uid: string, id: string, url: string, name : string, cuisine : string, category: string, review: number, likes:number): void{
    const newPost: Post = {
      id: id,
      recipy: recipy,
      ingradients: ingradients,
      uid: uid,
      imageURL: url,
      name: name,
      category:category,
      cuisine: cuisine,
      likes: 0,
      review: review
    }

    this.postSig.update((Posts) => [...Posts, newPost])
  }

  removePost(id: string): void{
    this.postSig.update((posts) => posts.filter((post) =>{ post.id !== id }))
  }
}




