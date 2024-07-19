import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { Car } from '../Model/car';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  constructor(private _httpClient:HttpClient) { }

  baseUrl:string = 'http://localhost:8081/car-api/cars/';

  addCar(car:Car, imageData:any):Observable<any>{

    const carData = {
      name: car.name,
      category: car.category,
      fuel: car.fuel,
      rent: car.rent,
      ratings: car.ratings,
      imageData: imageData,
      milage: car.milage,
      seats: car.seats,
      gearSystem: car.gearSystem
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this._httpClient.post<Car>(this.baseUrl, carData, { headers });
  }

  update(car:Car, imageData:any, carId:number):Observable<Car>{
    const carData = {
      id: car.id,
      name: car.name,
      category: car.category,
      fuel: car.fuel,
      rent: car.rent,
      ratings: car.ratings,
      imageData: imageData,
      milage: car.milage,
      seats: car.seats,
      gearSystem: car.gearSystem
    };
    return this._httpClient.put<Car>(this.baseUrl+'carId/'+carId, carData);
  }

  deleteCar(carId:number){
    return this._httpClient.delete<any>(this.baseUrl+'carId/'+carId)
  }

  getWithImages():Observable<Car[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this._httpClient.get<Car[]>(this.baseUrl+'all',{headers});
  }

  getById(id:number){
    return this._httpClient.get<Car>(this.baseUrl+'carId/'+id);
  }

  getImage(id:number): Observable<Uint8Array>{
    return this._httpClient.get(this.baseUrl+'image/'+id , { responseType: 'arraybuffer' }).pipe(map(response => new Uint8Array(response)));
  }

  changeImage(image:File,id:number): Observable<any>{
    const formData = new FormData();    
    formData.append('image', image);
    return this._httpClient.post(this.baseUrl+'carId/'+id+'/upload-image', formData);
  }

  uint8ArrayToDataUri(uint8Array: Uint8Array, mimeType: string): string {
    const binaryArray = [];
    for (let i = 0; i < uint8Array.length; i++) {
      binaryArray.push(uint8Array[i]);
    }
    const binary = String.fromCharCode.apply(null, binaryArray);
    return 'data:' + mimeType + ';base64,' + btoa(binary);
  }

  // private arrayBufferToBase64(arrayBuffer: ArrayBuffer) {
  //     const binaryArray = new Uint8Array(arrayBuffer);
  //     let binary = '';
  //     for (let i = 0; i < binaryArray.length; i++) {
  //       binary += String.fromCharCode(binaryArray[i]);
  //     }
  //     return btoa(binary);
  // }

}
