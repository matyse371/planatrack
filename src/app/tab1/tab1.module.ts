import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MenuModule } from '../menu/menu.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { TicketListModule } from '../ticket-list/ticket-list.module';
import { NewTicketModule } from '../ticket-list/new-ticket/new-ticket.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TicketListModule,
    NewTicketModule,
    Tab1PageRoutingModule,
    MenuModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
