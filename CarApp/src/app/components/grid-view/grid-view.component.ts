import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/Model/car';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent {

  constructor(private _router: Router){}

  @Input() cars!:Car[];
  @Input() currentPage!: number;
  @Input() pageSize!: number;

  detail(car:Car){
    this._router.navigate(['detail',car.id]);
  }

}
