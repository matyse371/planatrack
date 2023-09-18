import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu.component';
import { LoginModule } from './login/login.module';
import { FormsModule } from '@angular/forms';


import { MenuComponentRoutingModule } from './menu-routing.module';
import { SignupModule } from './signup/signup.module';
import { MenuListModule } from './menu-list/menu-list.module';




@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    IonicModule,
    MenuComponentRoutingModule,
    LoginModule,
    SignupModule,
    FormsModule,
    MenuListModule
  ]
})
export class MenuModule { }
