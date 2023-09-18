import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



import { SignupComponent } from './signup.component';




@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class SignupModule { }
