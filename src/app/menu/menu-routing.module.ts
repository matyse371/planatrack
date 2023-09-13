import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes, createUrlTreeFromSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { MenuComponent } from '../menu/menu.component';
import { LoginComponent } from '../menu/login/login.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuComponentRoutingModule {}
