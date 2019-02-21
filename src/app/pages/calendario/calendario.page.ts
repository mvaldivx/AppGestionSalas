import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreaEventoPage } from '../crea-evento/crea-evento.page';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  eventSource;
  viewTitle;
  isDayMode=false;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadEvents();
  }

  async presentModal(time) {
    const modal = await this.modalCtrl.create({
      component: CreaEventoPage,
      componentProps: { value: time}
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data != undefined) {
        this.createEvent(detail.data)
      }
   });

    return await modal.present();
  }

  onEventSelected(event) {
    
      console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }
  changeMode(mode) {
    if(mode === 'day'){
      this.isDayMode = true;
    }else{
      this.isDayMode = false;
    }
      this.calendar.mode = mode;
  }
  today() {
      this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
    if(this.isDayMode){
      this.presentModal(ev.selectedTime)
    }else{
      this.changeMode('day');
    }
    
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }
  onCurrentDateChanged(event:Date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
  }
  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date:Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  createEvent(data){
    var eventType = 0;
    var startDay = data.startOn;
    var endDay = data.startOn;
    this.eventSource.push();
  }

  loadEvents() {
    this.eventSource = this.createRandomEvents();
}
  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
        var date = new Date();
        var eventType = Math.floor(Math.random() * 2);
        var startDay = Math.floor(Math.random() * 90) - 45;
        var endDay = Math.floor(Math.random() * 2) + startDay;
        var startTime;
        var endTime;
        if (eventType === 0) {
            startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
            if (endDay === startDay) {
                endDay += 1;
            }
            endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
            events.push({
                title: 'All Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
        } else {
            var startMinute = Math.floor(Math.random() * 24 * 60);
            var endMinute = Math.floor(Math.random() * 180) + startMinute;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
            events.push({
                title: 'Event - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        }
    }
    return events;
}
}
