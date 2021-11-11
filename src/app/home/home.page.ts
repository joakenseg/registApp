import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from "../servicios/auth.service"


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  show = false;
  passwordToggleIcon = 'eye';
  email: string;
  password: string;
  messaje: string="";

  
  constructor(private router: Router, private authService: AuthService) {}

  toggleIcon(): void {
    this.show = !this.show
    if(this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  validNull() {
    this.authService.login(this.email, this.password).then(res => {
      this.router.navigate(['/welcome']);
    }).catch(err=> alert('los datos son incorrectos'))
  }

  ngOnInit() {

  }
  
}


