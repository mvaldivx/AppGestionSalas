import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreaEventoPage } from '../crea-evento/crea-evento.page';
var CalendarioPage = /** @class */ (function () {
    function CalendarioPage(modalCtrl) {
        this.modalCtrl = modalCtrl;
        this.date = new Date();
        this.monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nobiembre', 'Diciembre'];
    }
    CalendarioPage.prototype.ngOnInit = function () {
        //this.loadEvents();
        this.getDaysOfMonth();
    };
    CalendarioPage.prototype.getDaysOfMonth = function () {
        this.daysInThisMonth = new Array();
        this.daysInLastMonth = new Array();
        this.daysInNextMonth = new Array();
        this.currentMonth = this.monthNames[this.date.getMonth()];
        this.currentYear = this.date.getFullYear();
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
        this.selectedDate = day;
        console.log(day + ' ' + this.currentYear + ' ' + this.currentMonth);
    };
    CalendarioPage.prototype.NewEventModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var date, ActualDate, modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = (this.selectedDate != undefined) ? this.selectedDate : this.currentDate;
                        ActualDate = new Date();
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: CreaEventoPage,
                                componentProps: {
                                    aParameter: true,
                                    value: new Date(this.currentYear + '-' + this.currentMonth + '-' + date + ' ' + ActualDate.getHours() + ':' + ActualDate.getMinutes())
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (detail) {
                            if (detail !== null) {
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
//# sourceMappingURL=calendario.page.js.map