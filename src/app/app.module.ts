import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AgregaAulaPageModule } from './pages/agrega-aula/agrega-aula.module';
import { CreaEventoPageModule } from './pages/crea-evento/crea-evento.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {StoreCalendario} from './pages/Store/StoreCalendario';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AgregaAulaPageModule,
    AngularFireModule.initializeApp(environment.firebase, 'Salas'),
    AngularFireDatabaseModule,
    CreaEventoPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StoreCalendario,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
