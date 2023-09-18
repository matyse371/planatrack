import { Injectable, Component, inject } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subscription, tap } from 'rxjs';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  User,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);



  //State management
  user$ = user(this.auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  public currentUser?: User | null;


  public isLoggedIn: Boolean;




  constructor() {
    //this.currentUser = null;
    //this.isLoggedIn = false;

    //working auth
    this.isLoggedIn = this.isLogin();

    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
      if (aUser != null) {

        this.isLoggedIn = true;
        this.currentUser = aUser;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        JSON.parse(localStorage.getItem('user')!);

        console.log(aUser);


      } else {
        this.isLoggedIn = false;
        this.currentUser = null;
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
      console.log(this.isLoggedIn);
    });




  }




  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

  //Functions

  signUpWithEmail(email: string, password: string, displayName: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });

    if (this.auth.currentUser) {
      updateProfile(this.auth.currentUser, {
        displayName: displayName,
      })
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  signInWithEmail(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        this.currentUser = userCredential.user;
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
    console.log(this.currentUser);

    this.isLoggedIn = this.isLogin();

    return of(this.isLoggedIn).pipe(tap((v) => console.log(v)));
  }

  //working auth method
  isLogin(): boolean {
    const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      this.currentUser = this.auth.currentUser;
      return user !== null ? true : false;

  }

  login() {}

  logout() {
    signOut(this.auth)
      .then(() => {
        // Sign-out successful.
        console.log('signed out');
        this.isLoggedIn = false;
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });

  }
}
