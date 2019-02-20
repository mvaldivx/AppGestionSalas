import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-agrega-aula',
  templateUrl: './agrega-aula.page.html',
  styleUrls: ['./agrega-aula.page.scss'],
})
export class AgregaAulaPage implements OnInit {
Nombre:any;
Capacidad:any;
  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  Guardar(){
    if(this.Nombre != undefined && this.Capacidad != undefined ){
      this.modalCtrl.dismiss({Nombre:this.Nombre, Capacidad :this.Capacidad});
    }
  }

}
