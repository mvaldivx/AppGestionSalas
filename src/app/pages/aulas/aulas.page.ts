import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { resolve, reject } from 'q';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.page.html',
  styleUrls: ['./aulas.page.scss'],
})
export class AulasPage implements OnInit {
  ListCategory:any;
  temparrCat: any;
  constructor(
  ) { }

  ngOnInit() {
    this.getAulas().then((res:any) =>{
      this.ListCategory = res;
      this.temparrCat = res;
            console.log(this.temparrCat);
    })
  }

  getAulas(){
    var promise = new Promise((resolve, reject) => {
    firebase.database().ref().child('Salas').orderByChild('idSala').once('value', (snapshot)=>{
          let Catdata = snapshot.val();
          let temparr = [];
          for (var key in Catdata){
            temparr.push(Catdata[key]);
          }
          resolve(temparr);
        }).catch((err) =>{
          reject(err);
        });
    })
    return promise;
  }

  AddAula(){
    var Aula = firebase.database().ref().child("Salas");
    Aula.push({idSala:'1',Nombre:'Sala 1',Capacidad: 25, Estado: true});
    
  }
}
