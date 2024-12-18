import { Injectable, inject, signal } from '@angular/core';
import { signOut , Auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserState } from '../../model/user'

@Injectable({
  providedIn: 'root',
})



export class AuthService {
  private auth = inject(Auth);
  user$: Observable<User | null> = user(this.auth);

  currentUser = signal<UserState | null >(null);

  clearUser(): void {
    this.currentUser.set(null);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  // Sign up function
  public registry(email: string, password: string, username: string): Observable<string> {
    const promis = createUserWithEmailAndPassword(this.auth, email, password)
      .then((res) => updateProfile(res.user, { displayName: username }).then(()=>res.user.uid))
      .catch((err) => {
        console.error('Registry Error:', err);
        throw err;
      });
    return from(promis);
  }

  // Login function
  public login(email: string, password: string): Observable<void> {
    const promis = signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {})
      .catch((err) => {
        console.error('Login Error:', err);
        throw err;
      });
      console.log(this.currentUser)
    return from(promis);
  }

  logout(): Promise<void> {
    return signOut(this.auth)
      .then(() => {
        this.clearUser(); // Clear user signal
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        throw error;
      });
  }
}
