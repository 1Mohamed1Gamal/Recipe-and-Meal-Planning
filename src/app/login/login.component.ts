import { Component, inject, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {AuthService} from "../shared/authServices/auth.service"
import { Router } from '@angular/router';
import { Auth } from "@angular/fire/auth"
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  auth = inject(AuthService)
  AuthFire = inject(Auth)
  router = inject(Router)
  
  email = signal<string>('');
  username = signal<string>('');
  password = signal<string>('');
  errorMessage: string|null = null;

  onSubmit(): void {
    this.auth.login(this.email(), this.password()).subscribe({
      next: () =>{
      this.router.navigateByUrl('/profile')
    },
      error: err =>{
        this.errorMessage = err.code
      }
    })
  }
}
