import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {

  @Input() rating: number = 0;

  // stars: string[] = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['rating']) {
  //     this.updateStars();
  //   }
  // }

  // updateStars(): void {
  //   const fullStars = Math.floor(this.rating);
  //   console.log(fullStars);
  //   const remainder = this.rating - fullStars;
    
  //   this.stars = Array(5).fill('star_border');
  //   for (let i = 0; i < fullStars; i++) {
  //     this.stars[i] = 'star';
  //   }
  //   if (remainder == 0.5) {
  //     this.stars[fullStars] = 'star_half';
  //     console.log(true);
  //   }
  // }

  stars: { fillPercentage: number }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rating']) {
      this.updateStars();
    }
  }

  updateStars(): void {
    const fullStars = Math.floor(this.rating);
    
    const remainder = this.rating - fullStars;
    
    this.stars = Array(5).fill({ fillPercentage: 100});
   
    for (let i = 0; i < fullStars; i++) {
      this.stars[i].fillPercentage = 100;

    }
    if (remainder > 0 && remainder < 1) {
      const lastStarFillPercentage = remainder * 100;
      this.stars[fullStars] = { fillPercentage: lastStarFillPercentage };
    }

 
  }
}
