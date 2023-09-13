import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu.component';
import { LoginModule } from './login/login.module';
import { FormsModule } from '@angular/forms';


import { MenuComponentRoutingModule } from './menu-routing.module';



@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    IonicModule,
    MenuComponentRoutingModule,
    LoginModule,
    FormsModule
  ]
})
export class MenuModule { }
