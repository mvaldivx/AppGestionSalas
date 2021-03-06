import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import * as firebase from 'Firebase';

@Component({
  selector: 'app-crea-evento',
  templateUrl: './crea-evento.page.html',
  styleUrls: ['./crea-evento.page.scss'],
})
export class CreaEventoPage implements OnInit {
day:any;
time: any;
timeFin:any;
date:Date;
Descripcion: any;
monthNames: string[]=['Enero','Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nobiembre', 'Diciembre'];
am_pm:any;
am_pmFin:any;
Aulas = [];
Eventos=[];
idAula:any;
refSalas = firebase.database().ref('Salas/');
refEventos = firebase.database().ref('Eventos/');

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public toastCtrl : ToastController
  ) { 
    this.date =this.navParams.get('value');
    this.FormatDate();


    this.refEventos.on('value', resp => {
      this.Eventos = [];
      this.Eventos = this.GetAulasEventos(resp);
      this.refSalas.on('value', resp => {
        this.Aulas = [];
        this.Aulas = this.GetAula(resp);
      });
      
    });

  }

  ngOnInit() {
  }

  FormatDate(){
    var hours :string;
    hours = ((this.date.getHours() > 12) ? this.date.getHours() -12: this.date.getHours()) + "";
    this.am_pm = this.date.getHours() >= 12 ? "PM" : "AM";
    var month =  (((this.date.getMonth()+1)>10)?(this.date.getMonth()+1): '0'+(this.date.getMonth()+1))
    this.day = this.date.getDate() + '-' + this.monthNames[this.date.getMonth()]
     + 
     '-' + this.date.getFullYear();
     var minutos:any;
     var addFin = 1;
     if(this.date.getMinutes() > 0 && this.date.getMinutes() < 30){
      minutos = '30'
    }else{
      addFin+=1;
      hours=(parseInt(hours) + 1) + "";
      minutos= '00'
    }
    var hoursFin: string;
    this.am_pmFin =(this.date.getHours() +addFin) >= 12 ? "PM" : "AM";
    hoursFin =  ((parseInt(hours) +1) > 12) ? ((parseInt(hours)+1) -12) + "": (parseInt(hours)+1) + "";
    hours = (parseInt(hours) > 12) ? (parseInt(hours) -12) + "": parseInt(hours) + "";
    hours = (parseInt(hours) < 10)? "0" + hours: hours;
    hoursFin = (parseInt(hoursFin) < 10)? "0" + hoursFin: hoursFin;
    this.time = hours + ":"  + minutos ;
    this.timeFin = hoursFin + ":00";
    
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

  SaveEvent(){
    if(this.date != undefined && this.timeFin != undefined && this.Descripcion != undefined && this.idAula != undefined){
      var horaFin= (this.am_pmFin === 'AM')? this.timeFin: (parseInt(this.timeFin.split(':')[0]) + 12) + ":" + this.timeFin.split(':')[1];
      var FechaFin = new Date(this.day + " " + horaFin)
      var horaIni = (this.am_pm === 'AM')? this.time: (parseInt(this.time.split(':')[0]) + 12) + ":" + this.time.split(':')[1];
      var FechaIni = new Date(this.day + " " + horaIni)
      if(FechaIni < new Date()){
        this.presentToast("Error, La fecha de inicio seleccionada es menor a la fecha actual.");
      }else{
        if(FechaFin < FechaIni){
          this.presentToast("Error, La fecha de final seleccionada es menor a la fecha de inicio.");
        }else{
          this.modalCtrl.dismiss({
            FechaFin: FechaFin,
            FechaIni: FechaIni,
            Descripcion: this.Descripcion,
            idSala : parseInt(this.idAula)
          });
        }
      }
    }else{ this.presentToast("Error, Faltan datos")}
    
  }

  ObtenAulaDisp(){
    this.refEventos.on('value', resp => {
      this.Eventos = [];
      this.Eventos = this.GetAulasEventos(resp);
      this.refSalas.on('value', resp => {
        this.Aulas = [];
        this.Aulas = this.GetAula(resp);
      });
      
    });
  }

  GetAula  = snapshot =>{
    let returnArr = [];
    snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;
          if(this.Eventos.filter(function(Eventos){return Eventos.idSala === item.idSala}).length <= 0){
            returnArr.push(item);
          }
          
      });

      return returnArr;
  }


   GetAulasEventos  = snapshot =>{
    let returnArr = [];
    snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;
          let FechaFin = new Date(item.dtFinal)
          let FechaIni = new Date( item.dtInicio)
          var timeIn = (this.am_pm === 'AM')? this.time: (parseInt(this.time.split(':')[0]) + 12) + ':' + this.time.split(':')[1]
          var timeFn = (this.am_pmFin === 'AM')? this.timeFin: (parseInt(this.timeFin.split(':')[0]) + 12) + ':' + this.timeFin.split(':')[1]
          var dt = this.date.getFullYear() + '-' + ((this.date.getMonth()+1 >10)? this.date.getMonth()+1: '0'+(this.date.getMonth()+1)) + '-' + this.date.getDate()
          var dtIni = new Date(dt + ' ' + (((timeIn.split(":")[1])< 10)?'0' + timeIn: timeIn))
          var dtFin = new Date(dt + ' ' + (((timeFn.split(":")[1])< 10)?'0' + timeFn: timeFn))
          if( (dtFin > FechaIni && dtFin <= FechaFin) ||  
              (dtIni >= FechaIni && dtIni < FechaFin) ||
              (dtIni < FechaIni && dtFin > FechaFin) ){
            returnArr.push(item);
          }
      });

      return returnArr;
  }
}