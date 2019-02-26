import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreaEventoPage } from '../crea-evento/crea-evento.page';
import { OverlayEventDetail } from '@ionic/core';
import { StoreCalendario } from '../Store/StoreCalendario';
import * as firebase from 'Firebase'; 

let strCal = new StoreCalendario;
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  date= new Date();
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[]=['Enero','Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nobiembre', 'Diciembre'];
  currentMonth= strCal.getCurrentMonth();
  currentYear= strCal.getCurrentYear();
  currentDate: any;
  eventos:any[];
  selectedDate = strCal.getSelectedDate() ;
  ref = firebase.database().ref('Eventos/');

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    //this.loadEvents();
    this.getDaysOfMonth();
    this.ref.orderByChild('dtInicio').on('value', resp => {
      this.eventos = [];
      this.eventos = GetEventos(resp);
    });
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    strCal.setCurrentMonth(this.monthNames[this.date.getMonth()]);
    strCal.setCurrentYear(this.date.getFullYear());
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
    
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }
  
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
    }
  
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var i = 0; i < (6-lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
  }

  verEventosDelDia(day){
    this.selectedDate = day
    strCal.setSelectedDate(day);
    this.ref.orderByChild('dtInicio').on('value', resp => {
      this.eventos = [];
      this.eventos = GetEventos(resp);
    });
  }

  async NewEventModal() {
    var date = (strCal.getSelectedDate != undefined) ? strCal.getSelectedDate : this.currentDate;
    var ActualDate = new Date()
    const modal: HTMLIonModalElement =
       await this.modalCtrl.create({
          component: CreaEventoPage,
          componentProps: {
             aParameter: true,
             value: new Date(strCal.getCurrentYear() + '-' + strCal.getCurrentMonth() + '-' + date + ' ' + ActualDate.getHours() + ':' + ActualDate.getMinutes()) 
          }
    });
     
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      var params:any;
      params = detail.data;
       if(params != undefined) { 
         this.addEvent(params)
       }
    });
    
    await modal.present();
  }

  addEvent(data){
      var Evento = firebase.database().ref().child("Eventos");
      Evento.push({idSala:data.idSala,
                    dtInicio:data.FechaIni.getTime(),
                    dtFinal:data.FechaFin.getTime() ,
                    Descripcion:data.Descripcion,
                    idUsuario: 1});
  }


  newEvent(){
    this.NewEventModal()
  }

}


 export const GetEventos = snapshot => {

  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    var currDay =strCal.getSelectedDate()
    if( currDay != undefined){
      var currYear = strCal.getCurrentYear()
      var currMonth = strCal.getCurrentMonth()
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      let FechaFin = new Date(item.dtFinal)
      let FechaIni = new Date( item.dtInicio)
      var fdate = new Date(currYear + "-" + currMonth + '-' + currDay +" 00:00")
      var actualDateIni= new Date(fdate.getFullYear() + '-' + (fdate.getMonth()+1) + '-' + fdate.getDate() + ' 00:00')
      var actualDateFin= new Date(fdate.getFullYear() + '-' + (fdate.getMonth()+1) + '-' + fdate.getDate() + ' 23:59')
      
      if(FechaIni >= actualDateIni  && actualDateFin >= FechaFin ){
        returnArr.push(item);
      }
    }
          
      });

      return returnArr;
  };
