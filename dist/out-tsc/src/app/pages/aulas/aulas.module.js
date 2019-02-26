import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AulasPage } from './aulas.page';
var routes = [
    {
        path: '',
        component: AulasPage
    }
];
var AulasPageModule = /** @class */ (function () {
    function AulasPageModule() {
    }
    AulasPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AulasPage]
        })
    ], AulasPageModule);
    return AulasPageModule;
}());
export { AulasPageModule };
//# sourceMappingURL=aulas.module.js.map