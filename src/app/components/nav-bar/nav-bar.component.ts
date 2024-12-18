import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserFirebaseService } from '../../shared/userSrevices/user-firebase.service';
import { UserService } from '../../shared/userSrevices/user.service';
import { AuthService } from '../../shared/authServices/auth.service'
@Component({
  selector: "app-nav-bar",
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
})
export class NavBarComponent {
  authService = inject(AuthService)
  auth = inject(AuthService)
  userFirebaseService = inject(UserFirebaseService)
  userService = inject(UserService)
  constructor(){
    
  }
  logout(){
    this.authService.logout()
  }
}
