import { Component, signal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { PostsFirebaseService } from "../shared/postServices/posts-firebase.service";
import { AuthService } from "../shared/authServices/auth.service"
@Component({
  selector: "app-user-profile",
  templateUrl: "./add-post.component.html",
  styleUrls: ["./add-post.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AddPostComponent {

  defultIMG = "https://cdn.builder.io/api/v1/image/assets/TEMP/b390a0698e1f5d17e85b1538083551fc84cd0e138d05163cb6675df2004709ea?placeholderIfAbsent=true&apiKey=1f1356d0c2574f82958771cd44481ea0"

  // Uploaded main image URL
  postFirebaseService = inject(PostsFirebaseService)
  auth = inject(AuthService)
  imageUrl = signal<string>('')
  recip = signal<string>('')
  ingradient = signal<string>('')
  name = signal<string>('')
  review = signal<number>(0)
  cuisine = signal<string>('')
  category= signal<string>('')


  // Trigger the file input for the main upload button
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
        this.imageUrl.set(e.target?.result as string);

      };
      reader.readAsDataURL(file);
    }
  }

  addPost():void{
    this.postFirebaseService.addPost(this.recip(), this.ingradient(), this.auth.currentUser()?.uid!, this.imageUrl(), this.name(), this.review(), this.category(), this.cuisine(), 0).subscribe((postId) =>{
      this.imageUrl.set('')
      this.ingradient.set('')
      this.recip.set('')
      this.review.set(0)
      this.name.set('')
      this.cuisine.set('')
      this.category.set('')
    })
  }
}

