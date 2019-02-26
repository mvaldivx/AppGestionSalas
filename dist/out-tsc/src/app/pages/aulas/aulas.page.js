import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregaAulaPage } from '../agrega-aula/agrega-aula.page';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'Firebase';
var AulasPage = /** @class */ (function () {
    function AulasPage(modalCtrl, database, router) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.database = database;
        this.router = router;
        this.Aulas = [];
        this.ref = firebase.database().ref('Salas/');
        this.ref.on('value', function (resp) {
            _this.Aulas = [];
            _this.Aulas = GetAulas(resp);
        });
    }
    AulasPage.prototype.ngOnInit = function () {
    };
    AulasPage.prototype.goBack = function () {
        this.router.navigateByUrl('home');
    };
    AulasPage.prototype.ObtieneMaximoId = function () {
        var idMaximo = 1;
        this.Aulas.forEach(function (element) {
            if (element.idSala > idMaximo) {
                idMaximo = element.idSala;
            }
        });
        this.idAulaMax = idMaximo;
    };
    AulasPage.prototype.AddAula = function () {
        var Aula = firebase.database().ref().child("Salas");
        Aula.push({ idSala: this.idSalaAdd, Nombre: this.NombreAulaAdd, Capacidad: this.CapacidadAulaAdd, Estado: true });
    };
    AulasPage.prototype.presentModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ObtieneMaximoId();
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: AgregaAulaPage,
                                componentProps: { value: true }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (detail) {
                            _this.ObtieneMaximoId();
                            if (detail.data != undefined) {
                                _this.NombreAulaAdd = detail.data.Nombre;
                                _this.CapacidadAulaAdd = detail.data.Capacidad;
                                _this.idSalaAdd = _this.idAulaMax + 1;
                                _this.AddAula();
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AulasPage = tslib_1.__decorate([
        Component({
            selector: 'app-aulas',
            templateUrl: './aulas.page.html',
            styleUrls: ['./aulas.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            AngularFireDatabase,
            Router])
    ], AulasPage);
    return AulasPage;
}());
export { AulasPage };
export var GetAulas = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};
//# sourceMappingURL=aulas.page.js.map