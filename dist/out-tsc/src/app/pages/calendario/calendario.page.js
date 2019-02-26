import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreaEventoPage } from '../crea-evento/crea-evento.page';
import { StoreCalendario } from '../Store/StoreCalendario';
import * as firebase from 'Firebase';
var strCal = new StoreCalendario;
var CalendarioPage = /** @class */ (function () {
    function CalendarioPage(modalCtrl) {
        this.modalCtrl = modalCtrl;
        this.date = new Date();
        this.monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nobiembre', 'Diciembre'];
        this.currentMonth = strCal.getCurrentMonth();
        this.currentYear = strCal.getCurrentYear();
        this.selectedDate = strCal.getSelectedDate();
        this.ref = firebase.database().ref('Eventos/');
    }
    CalendarioPage.prototype.ngOnInit = function () {
        var _this = this;
        //this.loadEvents();
        this.getDaysOfMonth();
        this.ref.orderByChild('dtInicio').on('value', function (resp) {
            _this.eventos = [];
            _this.eventos = GetEventos(resp);
        });
    };
    CalendarioPage.prototype.getDaysOfMonth = function () {
        this.daysInThisMonth = new Array();
        this.daysInLastMonth = new Array();
        this.daysInNextMonth = new Array();
        strCal.setCurrentMonth(this.monthNames[this.date.getMonth()]);
        strCal.setCurrentYear(this.date.getFullYear());
        if (this.date.getMonth() === new Date().getMonth()) {
            this.currentDate = new Date().getDate();
        }
        else {
            this.currentDate = 999;
        }
        var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
            this.daysInLastMonth.push(i);
        }
        var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        for (var i = 0; i < thisNumOfDays; i++) {
            this.daysInThisMonth.push(i + 1);
        }
        var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
        var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
        for (var i = 0; i < (6 - lastDayThisMonth); i++) {
            this.daysInNextMonth.push(i + 1);
        }
        var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
        if (totalDays < 36) {
            for (var i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
                this.daysInNextMonth.push(i);
            }
        }
    };
    CalendarioPage.prototype.goToLastMonth = function () {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        this.getDaysOfMonth();
    };
    CalendarioPage.prototype.goToNextMonth = function () {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        this.getDaysOfMonth();
    };
    CalendarioPage.prototype.verEventosDelDia = function (day) {
        var _this = this;
        this.selectedDate = day;
        strCal.setSelectedDate(day);
        this.ref.orderByChild('dtInicio').on('value', function (resp) {
            _this.eventos = [];
            _this.eventos = GetEventos(resp);
        });
    };
    CalendarioPage.prototype.NewEventModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var date, ActualDate, modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = (strCal.getSelectedDate() != undefined) ? strCal.getSelectedDate() : this.currentDate;
                        ActualDate = new Date();
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: CreaEventoPage,
                                componentProps: {
                                    aParameter: true,
                                    value: new Date(strCal.getCurrentYear() + '-' + strCal.getCurrentMonth() + '-' + date + ' ' + ActualDate.getHours() + ':' + ActualDate.getMinutes())
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (detail) {
                            var params;
                            params = detail.data;
                            if (params != undefined) {
                                _this.addEvent(params);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CalendarioPage.prototype.addEvent = function (data) {
        var Evento = firebase.database().ref().child("Eventos");
        Evento.push({ idSala: data.idSala,
            dtInicio: data.FechaIni.getTime(),
            dtFinal: data.FechaFin.getTime(),
            Descripcion: data.Descripcion,
            idUsuario: 1 });
    };
    CalendarioPage.prototype.newEvent = function () {
        this.NewEventModal();
    };
    CalendarioPage = tslib_1.__decorate([
        Component({
            selector: 'app-calendario',
            templateUrl: './calendario.page.html',
            styleUrls: ['./calendario.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController])
    ], CalendarioPage);
    return CalendarioPage;
}());
export { CalendarioPage };
export var GetEventos = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var currDay = strCal.getSelectedDate();
        if (currDay != undefined) {
            var currYear = strCal.getCurrentYear();
            var currMonth = strCal.getCurrentMonth();
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            var FechaFin = new Date(item.dtFinal);
            var FechaIni = new Date(item.dtInicio);
            var fdate = new Date(currYear + "-" + currMonth + '-' + currDay + " 00:00");
            var actualDateIni = new Date(fdate.getFullYear() + '-' + (fdate.getMonth() + 1) + '-' + fdate.getDate() + ' 00:00');
            var actualDateFin = new Date(fdate.getFullYear() + '-' + (fdate.getMonth() + 1) + '-' + fdate.getDate() + ' 23:59');
            if (FechaIni >= actualDateIni && actualDateFin >= FechaFin) {
                returnArr.push(item);
            }
        }
    });
    return returnArr;
};
//# sourceMappingURL=calendario.page.js.map