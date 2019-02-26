import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
var AgregaAulaPage = /** @class */ (function () {
    function AgregaAulaPage(modalCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
    }
    AgregaAulaPage.prototype.ngOnInit = function () {
    };
    AgregaAulaPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    AgregaAulaPage.prototype.Guardar = function () {
        if (this.Nombre != undefined && this.Capacidad != undefined) {
            this.modalCtrl.dismiss({ Nombre: this.Nombre, Capacidad: this.Capacidad });
        }
    };
    AgregaAulaPage = tslib_1.__decorate([
        Component({
            selector: 'app-agrega-aula',
            templateUrl: './agrega-aula.page.html',
            styleUrls: ['./agrega-aula.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            NavParams])
    ], AgregaAulaPage);
    return AgregaAulaPage;
}());
export { AgregaAulaPage };
//# sourceMappingURL=agrega-aula.page.js.map