import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {

  constructor(private _router:Router, private _location:Location){}

  home(){
    this._router.navigate(['home']);
  }

  add(){
    this._router.navigate(['add']);
  }

  back(){
    this._location.back();
  }
}
