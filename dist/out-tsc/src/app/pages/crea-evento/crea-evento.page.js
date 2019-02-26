import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
var CreaEventoPage = /** @class */ (function () {
    function CreaEventoPage(modalCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nobiembre', 'Diciembre'];
        this.date = this.navParams.get('value');
        this.FormatDate();
    }
    CreaEventoPage.prototype.ngOnInit = function () {
    };
    CreaEventoPage.prototype.FormatDate = function () {
        var hours;
        hours = ((this.date.getHours() > 12) ? this.date.getHours() - 12 : this.date.getHours()) + "";
        this.am_pm = this.date.getHours() >= 12 ? "PM" : "AM";
        hours = (parseInt(hours) < 10) ? "0" + hours : hours;
        var month = (((this.date.getMonth() + 1) > 10) ? (this.date.getMonth() + 1) : '0' + (this.date.getMonth() + 1));
        this.day = this.date.getDate() + '-' + this.monthNames[this.date.getMonth()]
            +
                '-' + this.date.getFullYear();
        var minutos;
        if (this.date.getMinutes() > 0 && this.date.getMinutes() < 30) {
            minutos = '30';
        }
        else {
            console.log(this.date.getMinutes());
            hours += 1;
            minutos = '00';
        }
        this.time = hours + ":" + minutos;
    };
    CreaEventoPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    CreaEventoPage.prototype.SaveEvent = function () {
        if (this.date != undefined && this.Duracion != undefined && this.Descripcion != undefined)
            this.modalCtrl.dismiss({
                startOn: this.date,
                duracion: this.Duracion,
                descripcion: this.Descripcion
            });
    };
    CreaEventoPage = tslib_1.__decorate([
        Component({
            selector: 'app-crea-evento',
            templateUrl: './crea-evento.page.html',
            styleUrls: ['./crea-evento.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            NavParams])
    ], CreaEventoPage);
    return CreaEventoPage;
}());
export { CreaEventoPage };
//# sourceMappingURL=crea-evento.page.js.map