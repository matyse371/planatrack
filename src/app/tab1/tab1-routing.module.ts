import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { MenuComponent } from '../menu/menu.component';
import { LoginComponent } from '../menu/login/login.component';
import { SingleTicketPage } from '../ticket-list/single-ticket/single-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: ':id',
    component: SingleTicketPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
