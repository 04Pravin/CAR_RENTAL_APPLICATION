export class Car {
    
    id?: number;
    name: string;
    category:string;
    fuel: string;
    milage: number;
    rent: number;
    seats: number;
    gearSystem: string;
    imageData?: string;
    ratings: number;
    image?: File;

    constructor();
    constructor(name: string, category:string, fuel: string, milage: number, rent: number, seats: number, gearSystem: string, imageData: string, ratings: number, image: File);
    constructor(name?: string, category?:string, fuel?: string, milage?: number, rent?: number, seats?: number, gearSystem?: string, imageData?: string, ratings?: number, image?: File) {
        this.name = name || '';
        this.fuel = fuel || '';
        this.category = category || '';
        this.milage = milage || 0;
        this.rent = rent || 0;
        this.seats = seats || 0;
        this.gearSystem = gearSystem || '';
        this.imageData = imageData || '';
        this.ratings = ratings || 0;
        this.image = image ;
    }

    
}
