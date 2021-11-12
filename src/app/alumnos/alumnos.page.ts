import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ServiceAlumService } from '../servicios/service-alum.service'

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  listaAlum: any[]=[];

  constructor(private servicio: ServiceAlumService) { 
    this.traerDatos();
  }

  ngOnInit() {
  }

  traerDatos()
  {
    this.servicio.getAlumnos().subscribe((data)=>{
      console.log(data)
      this.listaAlum=data;
  });
  }

  alerta(){
    alert('aarg')
  }
}
