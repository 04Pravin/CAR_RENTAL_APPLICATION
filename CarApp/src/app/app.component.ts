import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'CarApp';
  
  showNavbar : boolean = true;
  
  constructor(private _router:Router){
    this.setNavbarVisibility(this._router.url);
  }
  
  private setNavbarVisibility(url: string): void {
    this.showNavbar = !url.includes('/login') && !url.includes('/register');
  }

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setNavbarVisibility(event.urlAfterRedirects);
      }
    });
  }  
}
