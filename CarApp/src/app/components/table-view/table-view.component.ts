import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/Model/car';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit{
  
  @Input() cars!: Car[];
  @Input() currentPage!: number;
  @Input() pageSize!: number;

  ngOnInit(): void {
    // console.log(this.cars);
  }

  displayedColumns: string[] = ['s.no', 'id', 'name', 'category', 'rating', 'fuel', 'rent', 'mileage', 'noOfSeats'];
  
}
