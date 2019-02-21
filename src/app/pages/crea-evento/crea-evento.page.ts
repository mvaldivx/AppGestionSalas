import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-crea-evento',
  templateUrl: './crea-evento.page.html',
  styleUrls: ['./crea-evento.page.scss'],
})
export class CreaEventoPage implements OnInit {
day:any;
time: any;
date:Date;
Descripcion: any;
Duracion: any;
  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) { 
    this.date =this.navParams.get('value');
    this.FormatDate();
  }

  ngOnInit() {
  }

  FormatDate(){
    var hours :string;
    hours = ((this.date.getHours() > 12) ? this.date.getHours() -12: this.date.getHours()) + "";
    var am_pm = this.date.getHours() >= 12 ? " PM" : " AM";
    hours = (parseInt(hours) < 10)? "0" + hours: hours;
    this.day = this.date.getDate() + '-' +
     (((this.date.getMonth()+1)>10)?(this.date.getMonth()+1): '0'+(this.date.getMonth()+1)) + 
     '-' + this.date.getFullYear();
    this.time = hours + ":"  + ((this.date.getMinutes() < 10)? '0'+this.date.getMinutes():this.date.getMinutes())  + am_pm;
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

  SaveEvent(){
    if(this.date != undefined && this.Duracion != undefined && this.Descripcion != undefined)
    this.modalCtrl.dismiss({
      startOn: this.date,
      duracion: this.Duracion,
      descripcion: this.Descripcion
    });
  }
}
