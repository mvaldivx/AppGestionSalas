import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AgregaAulaPage } from './agrega-aula.page';
var routes = [
    {
        path: '',
        component: AgregaAulaPage
    }
];
var AgregaAulaPageModule = /** @class */ (function () {
    function AgregaAulaPageModule() {
    }
    AgregaAulaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AgregaAulaPage]
        })
    ], AgregaAulaPageModule);
    return AgregaAulaPageModule;
}());
export { AgregaAulaPageModule };
//# sourceMappingURL=agrega-aula.module.js.map