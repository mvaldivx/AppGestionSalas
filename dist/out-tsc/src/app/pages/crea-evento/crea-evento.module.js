import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreaEventoPage } from './crea-evento.page';
var routes = [
    {
        path: '',
        component: CreaEventoPage
    }
];
var CreaEventoPageModule = /** @class */ (function () {
    function CreaEventoPageModule() {
    }
    CreaEventoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CreaEventoPage]
        })
    ], CreaEventoPageModule);
    return CreaEventoPageModule;
}());
export { CreaEventoPageModule };
//# sourceMappingURL=crea-evento.module.js.map