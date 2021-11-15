import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  show = false;
  passwordToggleIcon = 'eye';
  email: string;
  password: string;
  messaje: string="";
  formulario: FormGroup;
  nombre: string;
  apellido: string;

  constructor(private router: Router, private auth: AuthService) {
    this.formulario=new FormGroup({
      apellido: new FormControl('',[Validators.required, Validators.minLength(3)]),
      nombre: new FormControl('',[Validators.required, Validators.minLength(3)]),
      email: new FormControl('',[Validators.required, Validators.minLength(10), Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  toggleIcon(): void {
    this.show = !this.show
    if(this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  SaveUser() {
    this.router.navigate(['home']);
  }

  registrar(){
    this.auth.register(this.email, this.password, this.nombre, this.apellido).then(auth => {
      this.router.navigate(['/home'])
      console.log(auth), alert('Usuario registrado con exito')
    }).catch(err => console.log(err))
  }

  ngOnInit() {
  }
}