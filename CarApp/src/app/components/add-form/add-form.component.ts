import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/Model/car';
import { CarServiceService } from 'src/app/service/car-service.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit{

  gears:string[] = ['Manual','Automatic'];
  fuels:string[] = ['Petrol','Diesel','Battery','Gas', 'Gas/Petrol','Gas/Diesel'];

  car!:Car;
  selectedImage!: File;
  selectedFileName: string = '';
  imgurl!:string;
  imageData!: any;
  editForm!: any;
  carId!: number;
  existingImage!:any;
  flag!:boolean;
  extImgUrl!:any;
  imgFlag!:boolean;


  constructor(private _router:Router, private _carService:CarServiceService, private _activedRoute: ActivatedRoute){ }  
  ngOnInit() {
    this._activedRoute.params.subscribe((data)=>{
      this.carId = data['id'];
    });

    if(this.carId){
      this.flag = true;
      this._carService.getById(this.carId).subscribe({
        next:(data)=>{
          console.log(data);
          this.extImgUrl = data.imageData;
          
          this.addForm.patchValue({
            name: data.name, 
            category: data.category,
            fuel: data.fuel,
            ratings: data.ratings,
            milage: data.milage,
            gearSystem: data.gearSystem,
            rent: data.rent,
            seats: data.seats});

            if(data.imageData!= '' && !this.imgFlag)
              this.existingImage = this.getSanitizedImageData(data);
            
        }
      });
    }
  }

  addForm = new FormGroup({
    name: new FormControl(''),
      category: new FormControl(''),
      fuel: new FormControl(''),
      rent: new FormControl(),
      ratings: new FormControl(),
      milage: new FormControl(),
      seats: new FormControl(),
      gearSystem: new FormControl(''),
      image: new FormControl(null)
    }
    
  );

  onFileSelected(event: any) {
    this.imgFlag = true;
    this.selectedImage = event.target.files[0] as File;
    this.encodeImageToBase64();

    const reader = new FileReader();
      reader.onload = (e) => {
        this.imgurl =  e.target?.result as string ?? null;
      };
      reader.readAsDataURL(this.selectedImage);
    
  }

  encodeImageToBase64() {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
      
      this.imageData = reader.result?.toString().split(',')[1] || '';
            
      };
      // console.log(this.imageData);
      console.log('Ecoding....')

      reader.readAsDataURL(this.selectedImage);
    }
  
  }

  getSanitizedImageData(car: Car) {
    
    const base64Data = car.imageData!.replace(/^data:image\/jpeg;base64,/, '');

    const sanitizedData = base64Data.replace(/[^A-Za-z0-9+/=]/g, '');
    return 'data:image/jpeg;base64,' + sanitizedData;
  }

  add(form:any){  
    // console.log(this.imageData);

    if (!this.selectedImage) {
      console.error('Please select an image');
      return;
    }
      this._carService.addCar(form.value, this.imageData).subscribe({
      next:(data:any)=>{
        console.log(data);
       
      },
      error:(data:any)=>{
        console.log('Error while adding a car');
        console.log(data);
        
      },
      complete:()=>{
        console.log('Added a car successfully');
        this._router.navigate(['home']);
      }
    });
    if(this.selectedImage === null)
      console.log('There is no image in add form')
  }

  save(form:any){
    let url = this.extImgUrl;

    if(!this.imgFlag)
      url = this.extImgUrl;
    else
      url = this.imageData;

    this._carService.update(form.value, url, this.carId).subscribe({
      next:()=>console.log('Editing in process...'),
      error:()=>console.log('Erro while editing'),
      complete:()=>{
        this._router.navigate(['home']);
        console.log('Edited successfully');
      }
    });   
  }

  cancel(){
    if(!this.flag)
      this._router.navigate(['home']);
    else
      this._router.navigate(['detail',this.carId]);
  }
}
