import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { NewTicketComponent } from './new-ticket.component';



@NgModule({
  declarations: [NewTicketComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [NewTicketComponent]
})
export class NewTicketModule { }
