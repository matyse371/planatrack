import { Component, OnInit, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Note, Ticket } from 'src/app/models/ticket';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-single-ticket',
  templateUrl: './single-ticket.page.html',
  styleUrls: ['./single-ticket.page.scss'],
})
export class SingleTicketPage implements OnInit {
  selectedId: string;

  id: string = '';
  title: string = '';
  description: string = '';
  postedBy: string = '';
  assignedTo: string = '';
  datePosted: string = '';
  timestamp: any;

  notes$: Observable<Note[]>
  noteText: string = '';
  notePostedBy: string | null = '';
  totalNotes: number;


  private firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, auth: AuthService) {
    this.totalNotes = 0;

    auth.user$.subscribe(
      (aUser: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
        console.log(aUser);
        if (aUser != null) {
         // this.currentUser = aUser;

          this.notePostedBy = aUser.displayName;

          console.log(this.notePostedBy);
          //this.isLoggedIn = true;
        } else {
         // this.isLoggedIn = false;
        }
        //console.log(this.isLoggedIn);
      }
    );

    if (auth.currentUser?.displayName) {

      this.notePostedBy = auth.currentUser.displayName;
      console.log(this.notePostedBy);
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.selectedId = id;
    } else {
      this.selectedId = 'no';
    }



       // get a reference to the user-profile collection
       const userProfileCollection = collection(this.firestore, 'tickets/' + this.selectedId + '/notes' );

       const q = query(userProfileCollection, orderBy("timestamp", "desc") );

       // get documents (data) from the collection using collectionData
       this.notes$ = collectionData(q, {idField: "id"} ) as Observable<Note[]>;

       this.notes$.forEach(element => {
         console.log(element);
         this.totalNotes = element.length;


        console.log(this.totalNotes);
       });







  }

  async ngOnInit() {

    const ticketDoc = doc(this.firestore, 'tickets', this.selectedId);
    const docSnap = await getDoc(ticketDoc);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      this.title = docSnap.get('title');
      this.description = docSnap.get('description');
      this.postedBy = docSnap.get('postedBy');
      this.assignedTo = docSnap.get('assignedTo');
      this.datePosted = docSnap.get('datePosted');
      this.timestamp = docSnap.get('timestamp');
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }


  }

  addNote(text = this.noteText, notePostedBy = this.notePostedBy) {
    addDoc(
      collection(this.firestore, 'tickets/' + this.selectedId + '/notes'),
      { notePostedBy, text, timestamp: serverTimestamp() }
    );
  }
}
