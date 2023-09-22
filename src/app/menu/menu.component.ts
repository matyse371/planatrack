import { Component, OnInit, inject } from '@angular/core';

import { Auth, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';

import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {



  constructor(private modalCtrl: ModalController, private authservice: AuthService) {


  }

  ngOnInit() {}

  ngOnDestroy() {}

  closeModal() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  goToLogin() {}


}
