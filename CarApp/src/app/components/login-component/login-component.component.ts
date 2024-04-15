import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})



export class LoginComponentComponent {
  hide = true;

  constructor(private _router:Router){}
  
  login(){
    this._router.navigate(['home']);
  }
}

