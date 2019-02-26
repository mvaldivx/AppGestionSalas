import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'aulas', loadChildren: './pages/aulas/aulas.module#AulasPageModule' },
    { path: 'agrega-aula', loadChildren: './agrega-aula/agrega-aula.module#AgregaAulaPageModule' },
    { path: 'calendario', loadChildren: './pages/calendario/calendario.module#CalendarioPageModule' },
    { path: 'crea-evento', loadChildren: './pages/crea-evento/crea-evento.module#CreaEventoPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map