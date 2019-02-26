import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import * as firebase from 'Firebase';
var CreaEventoPage = /** @class */ (function () {
    function CreaEventoPage(modalCtrl, navParams, toastCtrl) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nobiembre', 'Diciembre'];
        this.Aulas = [];
        this.Eventos = [];
        this.refSalas = firebase.database().ref('Salas/');
        this.refEventos = firebase.database().ref('Eventos/');
        this.GetAula = function (snapshot) {
            var returnArr = [];
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                console.log(_this.Eventos);
                if (_this.Eventos.filter(function (Eventos) { return Eventos.idSala === item.idSala; }).length <= 0) {
                    returnArr.push(item);
                }
            });
            return returnArr;
        };
        this.GetAulasEventos = function (snapshot) {
            var returnArr = [];
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                var FechaFin = new Date(item.dtFinal);
                var FechaIni = new Date(item.dtInicio);
                var timeIn = (_this.am_pm === 'AM') ? _this.time : (_this.time.split(':')[0] + 12) + ':' + _this.time.split(':')[1];
                var timeFn = (_this.am_pmFin === 'AM') ? _this.timeFin : (_this.timeFin.split(':')[0] + 12) + ':' + _this.timeFin.split(':')[1];
                var dt = _this.date.getFullYear() + '-' + ((_this.date.getMonth() > 10) ? _this.date.getMonth() : '0' + _this.date.getMonth()) + '-' + _this.date.getDate();
                var dtIni = new Date(dt + ' ' + (((timeIn.split(":")[1]) < 10) ? '0' + timeIn : timeIn));
                var dtFin = new Date(dt + ' ' + (((timeFn.split(":")[1]) < 10) ? '0' + timeFn : timeFn));
                console.log(timeIn);
                console.log(dtFin + ' ' + FechaFin);
                console.log(dtIni + ' ' + FechaIni);
                if (FechaIni >= dtIni && dtFin >= FechaFin) {
                    returnArr.push(item);
                }
            });
            return returnArr;
        };
        this.date = this.navParams.get('value');
        this.FormatDate();
        this.refEventos.on('value', function (resp) {
            _this.Eventos = [];
            _this.Eventos = _this.GetAulasEventos(resp);
            _this.refSalas.on('value', function (resp) {
                _this.Aulas = [];
                _this.Aulas = _this.GetAula(resp);
            });
        });
    }
    CreaEventoPage.prototype.ngOnInit = function () {
    };
    CreaEventoPage.prototype.FormatDate = function () {
        var hours;
        hours = ((this.date.getHours() > 12) ? this.date.getHours() - 12 : this.date.getHours()) + "";
        this.am_pm = this.date.getHours() >= 12 ? "PM" : "AM";
        var month = (((this.date.getMonth() + 1) > 10) ? (this.date.getMonth() + 1) : '0' + (this.date.getMonth() + 1));
        this.day = this.date.getDate() + '-' + this.monthNames[this.date.getMonth()]
            +
                '-' + this.date.getFullYear();
        var minutos;
        var addFin = 1;
        if (this.date.getMinutes() > 0 && this.date.getMinutes() < 30) {
            minutos = '30';
        }
        else {
            addFin += 1;
            hours = (parseInt(hours) + 1) + "";
            minutos = '00';
        }
        var hoursFin;
        this.am_pmFin = (this.date.getHours() + addFin) >= 12 ? "PM" : "AM";
        hoursFin = ((parseInt(hours) + 1) > 12) ? ((parseInt(hours) + 1) - 12) + "" : (parseInt(hours) + 1) + "";
        hours = (parseInt(hours) > 12) ? (parseInt(hours) - 12) + "" : parseInt(hours) + "";
        hours = (parseInt(hours) < 10) ? "0" + hours : hours;
        hoursFin = (parseInt(hoursFin) < 10) ? "0" + hoursFin : hoursFin;
        this.time = hours + ":" + minutos;
        this.timeFin = hoursFin + ":00";
    };
    CreaEventoPage.prototype.presentToast = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: message,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreaEventoPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    CreaEventoPage.prototype.SaveEvent = function () {
        if (this.date != undefined && this.timeFin != undefined && this.Descripcion != undefined && this.idAula != undefined) {
            var horaFin = (this.am_pmFin === 'AM') ? this.timeFin : (parseInt(this.timeFin.split(':')[0]) + 12) + ":" + this.timeFin.split(':')[1];
            var FechaFin = new Date(this.day + " " + horaFin);
            var horaIni = (this.am_pm === 'AM') ? this.time : (parseInt(this.time.split(':')[0]) + 12) + ":" + this.time.split(':')[1];
            var FechaIni = new Date(this.day + " " + horaIni);
            if (FechaIni < new Date()) {
                this.presentToast("Error, La fecha de inicio seleccionada es menor a la fecha actual.");
            }
            else {
                if (FechaFin < FechaIni) {
                    this.presentToast("Error, La fecha de final seleccionada es menor a la fecha de inicio.");
                }
                else {
                    this.modalCtrl.dismiss({
                        FechaFin: FechaFin,
                        FechaIni: FechaIni,
                        Descripcion: this.Descripcion,
                        idSala: this.idAula
                    });
                }
            }
        }
        else {
            this.presentToast("Error, Faltan datos");
        }
    };
    CreaEventoPage = tslib_1.__decorate([
        Component({
            selector: 'app-crea-evento',
            templateUrl: './crea-evento.page.html',
            styleUrls: ['./crea-evento.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            NavParams,
            ToastController])
    ], CreaEventoPage);
    return CreaEventoPage;
}());
export { CreaEventoPage };
/*export const GetAulas = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;
          var timeIn = (this.am_pm === 'AM')? this.time: (this.time.split(':')[0] + 12) + ':' + this.time.split(':')[1]
          var timeFn = (this.am_pmFin === 'AM')? this.timeFin: (this.timeFin.split(':')[0] + 12) + ':' + this.timeFin.split(':')[1]
          var dtIni = new Date(this.date + ' ' + timeIn)
          var dtFin = new Date(this.date + ' ' + timeFn)
          returnArr.push(item);
      });

      return returnArr;
  };*/ 
//# sourceMappingURL=crea-evento.page.js.map