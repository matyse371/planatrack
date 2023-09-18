import { Component, OnInit, inject } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  serverTimestamp,
} from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss'],
})
export class NewTicketComponent implements OnInit {

  postedBy: string = '';
  assignedTo: string = '';
  title: string = '';
  description: string = '';
  datePosted: string = Date.now().toString();

  private firestore: Firestore = inject(Firestore);
  users$: Observable<User[]>

  constructor(
    private modalCtrl: ModalController, auth: AuthService
  ) {
    // get a reference to the user-profile collection
    const userProfileCollection = collection(this.firestore, 'users');

    // get documents (data) from the collection using collectionData
    this.users$ = collectionData(userProfileCollection) as Observable<User[]>;


    const userObject = auth.currentUser?.toJSON();


    auth.isAuth().subscribe((authed) => {
      const loggedIn = authed;
      console.log(loggedIn);

      if(loggedIn != true) {
        //this.router.navigate(['/menu/login']);
      }
    })


    if (auth.currentUser?.displayName) {

      this.postedBy = auth.currentUser.displayName;
      console.log(userObject);
    }

  }

  ngOnInit() {}

  //dismiss modal and clear all data
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  //This will submit the ticket with all data currently on the list
  confirm(
    title: string = this.title,
    description: string = this.description,
    postedBy: string = this.postedBy,
    assignedTo: string = this.assignedTo,
    datePosted: string = this.datePosted,
    status: string = 'open'
  ) {
    addDoc(collection(this.firestore, 'tickets'), <Ticket>{
      title,
      description,
      postedBy,
      assignedTo,
      datePosted,
      timestamp: serverTimestamp(),
      status
    });

    return this.modalCtrl.dismiss(this.postedBy, 'confirm');
  }
}
