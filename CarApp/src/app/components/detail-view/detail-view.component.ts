import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/Model/car';
import { CarServiceService } from 'src/app/service/car-service.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit{

  car!:Car;
  cars:Car[]=[];
  id!:number;
  image!:File;
  imageUrl: string | ArrayBuffer | null = null;
  flag!:boolean;
  showUploadIcon = true;
  isDeleteDialogOpen = false;
  nextCar!:Car;
  next!:boolean;
  prev!:boolean;
  index!:number;
  totalCars!:number;
  lastCarId!:any;
  firstCarId!:any;

  constructor(private _router:Router, private _carService:CarServiceService, private _activatedRoute:ActivatedRoute){}

  ngOnInit(){

    this._carService.getWithImages().subscribe({
      next: (data)=> {
        this.cars = data;
        this.totalCars = data.length;
        
        this.lastCarId = this.totalCars && this.totalCars > 0 ? this.cars[this.totalCars - 1].id : undefined;
        this.firstCarId = this.totalCars && this.totalCars > 0 ? this.cars[0].id : undefined;
        // console.log(this.lastCarId);
        // console.log(this.firstCarId);
      }
    });

    this._activatedRoute.params.subscribe({
        next:(data)=> {
          this.id = data['id'];
          this.getDetails();
        }
      });
      
  }

  getDetails(){
    this._carService.getById(this.id).subscribe({
      next:(data)=>{
        this.car = data;
        if(this.car.imageData!= '')
            this.car.imageData = this.getSanitizedImageData(this.car);
        console.log(this.car);
      },
      error:()=>console.log('Error while getting car where id is '+this.id),
      complete:()=>console.log('Completed get car')
    });

    // console.log(this.totalCars);
  }

  delete(){
    this._carService.deleteCar(this.id).subscribe({
      next:()=>console.log('Deleting a car'),
      error:()=>console.log('Error while deleting'),
      complete:()=>{
        console.log('Deleted successfully');
        this._router.navigate(['home']);
      }
    })
  }
  
  getSanitizedImageData(car: Car) {
    
    const base64Data = car.imageData!.replace(/^data:image\/jpeg;base64,/, '');

    const sanitizedData = base64Data.replace(/[^A-Za-z0-9+/=]/g, '');
    return 'data:image/jpeg;base64,' + sanitizedData;
  }

  onImageSelected(event:any){
    this.image = event.target.files[0] as File;
    this.flag = true;
    if (this.image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl =  e.target?.result as string ?? null;
      };
      reader.readAsDataURL(this.image);
    } else {
      this.imageUrl = null;
    }

  }

  edit(){
    this._router.navigate(['edit', this.id])
  }

  navigate(direction: 'prev' | 'next'){
    
    if (this.car) {
      this._carService.getWithImages().subscribe((data) => {
        const currentIndex = data.findIndex((car) => car.id === this.car!.id);
        let newIndex = currentIndex;
        this.index = currentIndex;

        if (direction === 'prev' && currentIndex > 0) {
          newIndex--;
        } else if (direction === 'next' && currentIndex < data.length - 1) {
          newIndex++;
        }

        // console.log(this.index);

        if (newIndex !== currentIndex) {
          this.nextCar = data[newIndex];
         
          this.id = this.nextCar.id!;
          
          this._router.navigate(['detail', this.nextCar.id]);
        }
      });
    }
  }
}
