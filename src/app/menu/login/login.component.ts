import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  email = '';
  password = '';

  ngOnInit() {}

  login() {
    this.authService.signInWithEmail(this.email, this.password);
    //window.location.reload();
    setTimeout(() => {
      this.router.navigate(['/menu']);
    }, 500);
  }
}
