import { Timestamp } from "@angular/fire/firestore";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  postedBy: string;
  assignedTo: string;
  datePosted: string;
  timestamp: any;
  status: string;

}


export interface Note {
  id: string;
  notePostedBy: string;
  text: string;
  timestamp: any;
}
