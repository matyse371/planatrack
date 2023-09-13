import { Injectable, Component, inject } from '@angular/core';
import { from, Observable, of, Subscription, tap } from 'rxjs';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  user,
  User,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);

  public isLoggedIn: Boolean;

  //State management
  user$ = user(this.auth);
  authStateSubscription: Subscription;

  public currentUser?: User | null;

  constructor() {
    //this.currentUser = null;
    this.isLoggedIn = true;
    this.authStateSubscription = this.user$.subscribe(
      (aUser: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
        console.log(aUser);
        if (aUser != null) {
          this.currentUser = aUser;
          console.log(aUser);

          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
        console.log(this.isLoggedIn);
      }
    );
  }

  ngOnDestroy () {
    this.authStateSubscription.unsubscribe();
  }

  //Functions
  signInWithEmail(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.isLoggedIn = true;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  isAuth() {


    return of(this.isLoggedIn).pipe(tap((v) => console.log(v)));
  }

  login() {}

  logout() {}
}
