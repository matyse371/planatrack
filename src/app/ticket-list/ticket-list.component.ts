import { Component, OnInit, inject } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  orderBy,
  or,
  Timestamp,
} from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription, of } from 'rxjs';

import { NewTicketComponent } from './new-ticket/new-ticket.component';

import { Ticket } from '../models/ticket';
import { formatDate } from '@angular/common';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  tickets$: Observable<Ticket[]>;
  ticketSub: Subscription;
  subbedTickets: Ticket[] = [];
  filterTickets$?: Observable<Ticket[]>;

  presentingElement: any = document.querySelector('app-tabs.ion-page');

  filterString: string = '';
  statusString: string = 'open';

  constructor(private modalCtrl: ModalController) {
    // get a reference to the user-profile collection
    const userProfileCollection = collection(this.firestore, 'tickets');

    const q = query(userProfileCollection, orderBy('timestamp', 'desc'));

    // get documents (data) from the collection using collectionData
    this.tickets$ = collectionData(q, { idField: 'id' }) as Observable<
      Ticket[]
    >;

    this.ticketSub = this.tickets$.subscribe((tickets) => {
      console.log(tickets);
      this.subbedTickets = tickets;

      console.log('fTickets func: ' + this.subbedTickets);

      this.filterTickets$ = this.setStatus(this.statusString);
    });

    //this.filterTickets$ = of(this.subbedTickets);

    console.log(this.setStatus(this.statusString));

    console.log('filter tickets constructor: ' + this.filterTickets$);

    this.tickets$.forEach((element) => {
      console.log(element);
    });
  }

  formatDate(date: string) {
    return formatDate(date, 'yyyy-MM-dd ', 'en-US');
  }

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: NewTicketComponent,
      animated: true,
      presentingElement: this.presentingElement

    });
    modal.present();
  }

  statusTickets(event: any) {
    console.log(this.statusString);

    this.filterTickets$ = this.setStatus(event.detail.value);
  }

  setStatus(value: any) {
    this.statusString = value;
    console.log(this.statusString);

    const subTickets = this.subbedTickets.filter((tick) => {
      return tick.status.includes(this.statusString);
    });

    console.log(subTickets);

    return of(subTickets);
  }

  searchTickets(event: any) {
    this.filterString = event.detail.value;
    console.log(this.filterString);

    this.filterTickets$?.subscribe((t) => {
      const subTickets = t.filter((tick) => {
        console.log(tick);
        return (
          tick.title.includes(this.filterString) ||
          tick.description.includes(this.filterString)
        );
      });

      this.filterTickets$ = of(subTickets);
    });
  }
}
