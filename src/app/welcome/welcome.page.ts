import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  
  listaRamos:{id:number, nombre:string}[]=[];

  constructor() {
    this.listaRamos=[{"id": 1, "nombre": "Programacion"},
    {"id": 2, "nombre": "Base de datos"},
    {"id": 3, "nombre": "Arquitectura"}]
   }

  ngOnInit() {
  }

}
