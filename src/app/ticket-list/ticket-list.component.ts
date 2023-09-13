import { Component, OnInit, inject } from '@angular/core';

import { Firestore, collection, collectionData, query, where, orderBy, or } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { NewTicketComponent } from './new-ticket/new-ticket.component';

import { Ticket } from '../models/ticket';
import { formatDate } from '@angular/common';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent  implements OnInit {

  private firestore: Firestore = inject(Firestore);
  tickets$: Observable<Ticket[]>;

  constructor(private modalCtrl: ModalController) {
    // get a reference to the user-profile collection
    const userProfileCollection = collection(this.firestore, 'tickets');

    const q = query(userProfileCollection, orderBy("timestamp", "desc") );

    // get documents (data) from the collection using collectionData
    this.tickets$ = collectionData(q, {idField: "id"} ) as Observable<Ticket[]>;

    this.tickets$.forEach(element => {
      console.log(element);
    });




  }

  formatDate(date: string) {
    return formatDate(date, 'yyyy-MM-dd ', 'en-US')
  }

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: NewTicketComponent,
    });
    modal.present();
  }

}

