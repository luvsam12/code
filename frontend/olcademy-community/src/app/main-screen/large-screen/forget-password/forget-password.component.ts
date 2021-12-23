
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Component, Directive, Input, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, NG_VALIDATORS, Validator, Validators} from '@angular/forms';
import { AppConfig } from 'src/app/shared/services/app.config';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { UploadsService } from 'src/app/shared/services/uploads.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationComponent } from 'src/app/popups/confirmation/confirmation.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted ));
  }
}
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  logoPath: any = AppConfig.LOGO_PATH;
  submitted=false;
  email_invalid=false;
  cant_find_email=false;
  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(private router: Router,
    private dialogue: MatDialog,private activatedroute:ActivatedRoute,
    private UploadsService: UploadsService,
    private http : HttpClient,
    private AuthenticationService: AuthenticationService) { 
   
  }

  ngOnInit(): void {
      document.getElementById('logo-image').innerHTML = '<img src="'+this.logoPath+'" class="logos" />'
  }
  forgetPasswordSubmit(isValid,email){
    
    if(isValid){
      // console.log(email);
      this.AuthenticationService.forgotPassword(email).subscribe((data)=>{
        //  console.log(data);
         if(data.success===true){
          this.submitted=true;
          this.email_invalid=false;
         }else if(data.msg==="can't find user with this email id"){
          this.email_invalid=true;
          this.submitted=false;
         }
      });
    }
    else{

    }
  }
}
