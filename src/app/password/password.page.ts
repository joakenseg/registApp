import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
  providers: [AuthService],
})
export class PasswordPage implements OnInit {

  userEmail = new FormControl('')

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async oneReset(){
    try{
      const email = this.userEmail.value;
      await this.authSvc.resetPassword(email);
      window.alert('Email sent, check your inbox')
      this.router.navigate(['/home'])
    }
    catch(error){console.log(error)}
    
  }
}
