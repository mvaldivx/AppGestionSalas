import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CalendarioPage } from './calendario.page';
import { NgCalendarModule } from 'ionic2-calendar';
var routes = [
    {
        path: '',
        component: CalendarioPage
    }
];
var CalendarioPageModule = /** @class */ (function () {
    function CalendarioPageModule() {
    }
    CalendarioPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                NgCalendarModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CalendarioPage]
        })
    ], CalendarioPageModule);
    return CalendarioPageModule;
}());
export { CalendarioPageModule };
//# sourceMappingURL=calendario.module.js.map