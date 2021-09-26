import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  show = false;
  passwordToggleIcon = 'eye';
  usuario = null;
  contrasenna = null;

  constructor(private router: Router) {}

  toggleIcon(): void {
    this.show = !this.show
    if(this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  validNull() {
    if(this.usuario == "instituto@duocuc.cl" && this.contrasenna == 1234) {
      this.router.navigate(['/welcome'])
    }
  }
}
