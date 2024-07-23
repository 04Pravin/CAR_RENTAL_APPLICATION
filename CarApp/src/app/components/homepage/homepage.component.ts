import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Car } from 'src/app/Model/car';
import { CarServiceService } from 'src/app/service/car-service.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  cars!:Car[];
  pageSize = 10;
  currentPage = 0;
  totalItems = 0;
  showTable!: boolean;
  getData!:boolean;

  constructor(private _carService:CarServiceService, private _router:Router){}

  
  ngOnInit(): void {
    this.getData = true;
    this.getAllCars();
    
  }
  
  getAllCars(){
        this._carService.getWithImages().subscribe({
      next:(data)=>{
        this.cars = data;
        this.totalItems = this.cars.length;
        this.cars.forEach(car => {
          if(car.imageData!= '')
            car.imageData = this.getSanitizedImageData(car);
          });
        console.log(this.cars);
      },
      complete: () =>{
        this.getData = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  
  table(){
    this.showTable = true;
  }

  grid(){
    this.showTable = false;
  }

  sortItems(sortBy:string) {
    switch (sortBy) {
      case 'name':
        this.cars = this.cars.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rent':
        this.cars = this.cars.sort((a, b) => a.rent - b.rent);
        break;
      case 'ratings':
        this.cars = this.cars.sort((a, b) => b.ratings - a.ratings);
        break;
      // default:
      //   this.sortedCars = this.cars;
    }
  }

  getSanitizedImageData(car: Car) {
    const base64Data = car.imageData!.replace(/^data:image\/jpeg;base64,/, '');
    const sanitizedData = base64Data.replace(/[^A-Za-z0-9+/=]/g, '');
    return 'data:image/jpeg;base64,' + sanitizedData;
  }

}
