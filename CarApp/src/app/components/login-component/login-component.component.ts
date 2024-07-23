import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Auth/Service/auth-service.service';
import { User } from 'src/app/Model/user';
import { RegisterComponent } from '../register/register.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent {
  hide = true;
  loginForm:FormGroup;
  isLogin!:boolean;
  currentUsername!:string;
  resetPasswordForm!:FormGroup;
  forgotPassword!:boolean;
  user:User|null = null;
  updateUser!:User;
  confirmReset!:boolean;
  updatePasswordForm!:FormGroup;
  id:number|null = null;
  showPassword!:boolean;
  verifyOtp!:boolean;
  enterOtp!:boolean;
  verified!:boolean;
  progress!:boolean;
  verificationProgress!:boolean;
  gettingUserProgress!:boolean;
  

  constructor(private _snackBar:MatSnackBar, private _fb:FormBuilder, private _router:Router, private _authService:AuthServiceService, public dialogRef:MatDialog){
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.resetPasswordForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      otp: ['']
    });

    this.updatePasswordForm = this._fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      showPassword: [false]
    });

    this.updatePasswordForm.get('showPassword')?.valueChanges.subscribe(value => {
      this.showPassword = value;
    });
  }
  
  login(): void {
    if (this.loginForm.valid) {

      this.isLogin = true;

      const { username, password } = this.loginForm.value;
      this._authService.login(username, password).subscribe({
        next: (data) => {
          if (data && data.token) {
            localStorage.setItem('token', data.token);
            this.currentUsername = username;
            
            console.log('Token:', data.token);
            console.log('Logging in');
            this._router.navigate(['/home'], {queryParams: {username: this.currentUsername}});
            console.log('Logged in successfully');
          } else {
            console.log('No token received');
          }
        },
        error: (err) => {
          console.error('Error while logging in:', err);
          this.isLogin = false;
          this._snackBar.open('Error while logging in', 'close', {duration: 5*1000});
        },
        complete: () =>{
          this.isLogin = false;
        }
      });
    } else {
      console.log('Form is invalid');
    } 
  }

  signUp(){
    const dialog = this.dialogRef.open(RegisterComponent);
    dialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onEnter(event: Event): void {
    event.preventDefault();
    this.login();
  }

  toggleForgotPassword(){
    this.forgotPassword = true;
  }

  sendOtp(){
    this.progress = true;
    const {username, email} = this.resetPasswordForm.value;
    this._authService.sendOtp(email).subscribe({
      next: () => console.log('Sending otp'),
      error: () => console.log('Otp not sent'),
      complete: () => {
        console.log('Otp sent successfully');
        this._snackBar.open('Otp sent','close', {duration: 5*1000});
        this.verifyOtp = true;
        this.progress = false;
      }
    });
  }

  verify(){
    this.verificationProgress = true;
    const {email, otp} = this.resetPasswordForm.value;
    this._authService.verifyOtp(email, otp).subscribe({
      next: () => console.log('Verifying otp'),
      error: () => console.log('Failed to verify'),
      complete: () => {
        console.log('Verified successfully');
        this.verified = true;
        this.next();
        this.verifyOtp = false;
        this.enterOtp = true;
        this.verificationProgress = false;
      }
    });
  }

  next(){
    this.gettingUserProgress = true;
    if(this.resetPasswordForm.valid){
      this.confirmReset = true;
      const {username, email} = this.resetPasswordForm.value;
      
      this._authService.getUser(username, email).subscribe({
        next: (data) => {
          this.user = data;
          console.log(this.id);
          this.updateUser = data;
        },
        error: () => {
          console.log("Error while getting details");
          this.forgotPassword = false;
          this.confirmReset = false;
        },
        complete: () =>{ 
          console.log("Successfully got details");
          this.gettingUserProgress = false;
        }
      });
    }
  }


  back(){
    this.forgotPassword = false;
  }

  cancel(){
    this.forgotPassword = true;
    this.confirmReset = false;
  }

  updatePassword(){
    if(this.updatePasswordForm.valid){
        const {password, confirmPassword} = this.updatePasswordForm.value;

        this.updateUser.password = password;
        console.log(this.updateUser);
        if (typeof this.updateUser.id === 'number'){
          this._authService.updateUser(this.updateUser, this.updateUser.id).subscribe({
            next:() => console.log('Updating password'),
            error:() => console.log('Error while updating password'),
            complete:() => {
              console.log('Password updated successfully');
              this.forgotPassword = false;
              this.confirmReset = false;
              this._snackBar.open('Password updated successfully', 'close', {duration : 5*1000});
            }
          });
        }
    }
  }
  
}