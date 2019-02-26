import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregaAulaPage } from '../agrega-aula/agrega-aula.page';
import { OverlayEventDetail } from '@ionic/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

import * as firebase from 'Firebase';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.page.html',
  styleUrls: ['./aulas.page.scss'],
})
export class AulasPage implements OnInit {
  ListCategory:any;
  NombreAulaAdd:any;
  CapacidadAulaAdd:any;
  idSalaAdd:any;
  idAulaMax:any;
  Aulas = [];
  ref = firebase.database().ref('Salas/');

  constructor(
    public modalCtrl: ModalController,
    public database: AngularFireDatabase,
    public router: Router
  ) { 
    this.ref.on('value', resp => {
      this.Aulas = [];
      this.Aulas = GetAulas(resp);
    });
  }

  ngOnInit() {
      }
  

  goBack(){
    this.router.navigateByUrl('home');
  }

  ObtieneMaximoId(){
    var idMaximo = 1;
    this.Aulas.forEach((element) => {
      if(element.idSala > idMaximo){
        idMaximo = element.idSala
      }
    });
    this.idAulaMax = idMaximo;
  }

  AddAula(){
    var Aula = firebase.database().ref().child("Salas");
    Aula.push({idSala:this.idSalaAdd,Nombre:this.NombreAulaAdd,Capacidad: this.CapacidadAulaAdd, Estado: true});
  }

  async presentModal() {
    this.ObtieneMaximoId();
    const modal = await this.modalCtrl.create({
      component: AgregaAulaPage,
      componentProps: { value: true}
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      this.ObtieneMaximoId();
      if (detail.data != undefined) {
       this.NombreAulaAdd= detail.data.Nombre;
       this.CapacidadAulaAdd= detail.data.Capacidad;
       this.idSalaAdd = this.idAulaMax +1 ;
       this.AddAula();
      }
   });

    return await modal.present();
  }
}
export const GetAulas = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;
          returnArr.push(item);
      });

      return returnArr;
  };