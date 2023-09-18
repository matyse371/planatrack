import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {


  displayName = '';
  phoneNumber = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  signUp() {
    this.authService.signUpWithEmail(this.email, this.password, this.displayName);


  }

}
