import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Auth/Service/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm = new FormGroup({
    username: new FormControl('', Validators.required),
    mobileNumber: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    role: new FormControl('USER', Validators.required),
    confirmPassword: new FormControl('', Validators.required)

  }, { validators: this.passwordMatchValidator() });

  message!: string;
  role: string = 'USER';

  constructor(
    private _router:Router, 
    private _authService:AuthServiceService, 
    private _snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<RegisterComponent>){}

  register(form: any){
    this._authService.register(form.value).subscribe({
      next: (data) =>console.log(data),
      error: () => {
        this.message = 'User not created. Please try again'
        this._snackBar.open(this.message, 'close');
        console.log('Error while adding user');
      },
      complete: () => {
        this.message = 'User created successfully';
        console.log('Added successfully');
        this.dialogRef.close(form.value);
        this._snackBar.open(this.message, 'close');
        this._router.navigate(['/login']);
      }
    });
  }

  cancel(){
    this.dialogRef.close();
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      return password && confirmPassword && password.value !== confirmPassword.value
        ? { passwordMismatch: true }
        : null;
    };
  }
}
