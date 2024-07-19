import { Role } from "./Role.enum";

export class User {

    id?:number;
    username!:string;
    password!:string;
    mobileNumber!:number;
    email!:string;
    role!: Role[];
    
    constructor(username:string, password:string, mobileNumber:number, email:string, role: Role[]){
        this.username = username;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.role = role;
    }
}
export { Role };

