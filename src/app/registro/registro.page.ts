import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  show = false;
  passwordToggleIcon = 'eye';
  usuario = null;
  contrasenna = null;
  messaje: string="";
  formulario: FormGroup;

  constructor(private router: Router) {
    this.formulario=new FormGroup({
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

  ngOnInit() {
  }

}