import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketListComponent } from './ticket-list.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NewTicketModule } from './new-ticket/new-ticket.module';



@NgModule({
  declarations: [TicketListComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [TicketListComponent]
})
export class TicketListModule { }
