import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  user: User = {
    email: '',
    displayName: '',
    uid: '',
    photoURL: '',
    emailVerified: false
  };

  ngOnInit(): void {
    this.authService.isAuth().subscribe(user => {
      if(user) {
        this.user = user;
        console.log('USER', user);
      }
    })
  }

}
