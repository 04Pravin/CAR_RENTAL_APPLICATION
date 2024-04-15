import { Component, Input, OnInit } from '@angular/core';
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
  sortedCars!:Car[];

  constructor(private _carService:CarServiceService, private _router:Router){}

  
  ngOnInit(): void {
    this._carService.getWithImages().subscribe({
      next:(data)=>{
        this.cars = data;
        this.cars.forEach(car => {
          if(car.imageData!= '')
            car.imageData = this.getSanitizedImageData(car);
          });
          this.sortedCars =this.cars;
        console.log(this.cars);
      }
    });

  }
  


  detail(car:Car){
    this._router.navigate(['detail',car.id]);
  }  

  sortItems(sortBy:string) {
    switch (sortBy) {
      case 'name':
        this.sortedCars = this.cars.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rent':
        this.sortedCars = this.cars.sort((a, b) => a.rent - b.rent);
        break;
      case 'ratings':
        this.sortedCars = this.cars.sort((a, b) => b.ratings - a.ratings);
        break;
      default:
        this.sortedCars = this.cars;
    }
  }

  getSanitizedImageData(car: Car) {
    const base64Data = car.imageData!.replace(/^data:image\/jpeg;base64,/, '');
    const sanitizedData = base64Data.replace(/[^A-Za-z0-9+/=]/g, '');
    return 'data:image/jpeg;base64,' + sanitizedData;
  }

}
