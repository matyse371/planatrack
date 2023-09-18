import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes, createUrlTreeFromSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { MenuComponent } from '../menu/menu.component';
import { LoginComponent } from '../menu/login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,


    canActivate: [
      (next: ActivatedRouteSnapshot) => {
        return inject(AuthService)
          .isAuth().pipe(
            map((isLoggedIn) =>
              isLoggedIn ? true : createUrlTreeFromSnapshot(next, [ 'login'])
            )
          );
      },
    ]


  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuComponentRoutingModule {}
