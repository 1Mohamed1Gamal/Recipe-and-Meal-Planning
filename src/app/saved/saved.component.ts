import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserFirebaseService } from "../shared/userSrevices/user-firebase.service";
import { UserService } from "../shared/userSrevices/user.service";

import { AuthService } from "../shared/authServices/auth.service";

import { CommentFirebaseService } from "../shared/commentServices/comment-firebase.service";
import { CommentService } from "../shared/commentServices/comment.service";

import { PostsFirebaseService } from "../shared/postServices/posts-firebase.service";
import { PostService } from "../shared/postServices/post.service";
import { PostDetailComponent } from '../components/post-detail/post-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredient-filter',
  standalone: true,
  imports: [FormsModule, PostDetailComponent, CommonModule],
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css'],
})
export class SavedComponent {
  // Selected filter method
  selectedFilter: string = 'category';

  // Filters object to store user inputs
  filters = {
    search: '',
    cuisine: '',
    category: 'lunch', // Default category
  };

  filteredPosts: any[] = []; // Array to store filtered posts

  auth = inject(AuthService);

  userFirebaseService = inject(UserFirebaseService);
  userService = inject(UserService);

  postFirebase = inject(PostsFirebaseService);
  postService = inject(PostService);

  commentFirebaseService = inject(CommentFirebaseService);
  commentService = inject(CommentService);

  ngOnInit(): void {
    // Load users
    this.userFirebaseService.getUsers().subscribe((users) => {
      this.userService.userSig.set(users);
    });

    // Load posts
    this.postFirebase.getPosts().subscribe((posts) => {
      this.postService.postSig.set(posts);
      this.applyFilters(); // Apply filters after posts are loaded
    });

    // Load comments
    this.commentFirebaseService.getComments().subscribe((comments) => {
      this.commentService.commentSig.set(comments);
    });
  }

  /**
   * Applies the selected filters to the posts.
   */
  applyFilters(): void {
    const posts = this.postService.postSig();
    const savedPostsIds = this.auth.currentUser()?.PostsId || []; // Get saved post IDs
  
    this.filteredPosts = posts.filter((post) => {
      // console.log(post.id)
      // Ensure the post is in the saved list
      const isSaved = savedPostsIds.includes(post.id);
  
      if (!isSaved) return false; // Exclude posts not saved by the user
  
      // Apply additional filters based on selectedFilter
      switch (this.selectedFilter) {
        case 'search':
          return (
            post.recipy?.toLowerCase().includes(this.filters.search.toLowerCase()) ||
            post.ingradients?.toLowerCase().includes(this.filters.search.toLowerCase())||
            post.name?.toLowerCase().includes(this.filters.search.toLowerCase())
          );
        case 'cuisine':
          return post.cuisine?.toLowerCase() === this.filters.cuisine.toLowerCase();
        case 'category':
          return post.category?.toLowerCase() === this.filters.category.toLowerCase();
        default:
          return true; // Show all posts if no filter is applied
      }
    });
  }

  /**
   * Tracks posts by their unique ID for performance optimization.
   */
  trackByPostId(index: number, post: any): string {
    return post.id;
  }
}
