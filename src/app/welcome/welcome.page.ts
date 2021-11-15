import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  
  listaRamos:{id:number, nombre:string}[]=[];
  name: string;
  Bienvenida:string;
  nombre:string;
  apellido:string;

  constructor(private authservice: AuthService) {
    this.listaRamos=[{"id": 1, "nombre": "Programacion"},
    {"id": 2, "nombre": "Base de datos"},
    {"id": 3, "nombre": "Arquitectura"}]}

  ngOnInit() {
    
  }
}
