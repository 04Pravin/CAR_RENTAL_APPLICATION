import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthServiceService } from 'src/app/Auth/Service/auth-service.service';
import { User, Role } from 'src/app/Model/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit{

  currentUser!:any;
  username!:string;
  isAdmin!:boolean;

  constructor(private _router:Router, private _activatedRoute:ActivatedRoute, private _location:Location, private _authService:AuthServiceService){}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      this.username = params['username'];
    });

    if(this.username){
      this._authService.getUserDetails(this.username).subscribe({
        next: (data) => {
          this.currentUser = data;
          this.isAdmin = this.currentUser.role.includes('ADMIN');
          console.log(this.currentUser.role);
        },
        error: () => console.log('Error while getting user details'),
        complete: () => console.log('Successfully got user details')
      });
    }
  }
  
 
  
  home(){
    this._router.navigate(['home']);
  }

  add(){
    this._router.navigate(['add']);
  }

  back(){
    this._location.back();
  }

  logout(){
    this._authService.logout();
  }
}
