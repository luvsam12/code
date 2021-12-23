import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Component, Directive, Input, OnInit } from '@angular/core';
import {AbstractControl, FormGroupDirective, NgForm, NG_VALIDATORS, Validator, Validators} from '@angular/forms';
import { AppConfig } from 'src/app/shared/services/app.config';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GuidelinesPopupComponent } from 'src/app/popups/guidelines-popup/guidelines-popup.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { UploadsService } from 'src/app/shared/services/uploads.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationComponent } from 'src/app/popups/confirmation/confirmation.component';
import { CancomponentLeave } from 'src/app/shared/services/authdeactive.guard';
import {FormControl} from '@angular/forms';

@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: ConfirmEqualValidatorDirective,
      multi: true
  }]
})
export class ConfirmEqualValidatorDirective implements Validator {
  @Input() appConfirmEqualValidator: string;
  validate(control: AbstractControl): { [key: string]: any } | null {
      const controlToCompare = control.parent.get(this.appConfirmEqualValidator);
      if (controlToCompare && controlToCompare.value !== control.value) {
          return { 'notEqual': true };
      }

      return null;
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit,CancomponentLeave {

  canleave(): boolean {
    if(this.firstnameFormControl.dirty){
     return  window.confirm("Warning: Changes you made may not be saved.");
       }
     return true;
 }



  show:Boolean =true;
  passNo :any;
  hide = true;
  hides = true;
  isLoad:Boolean = false
  logoPath: any = AppConfig.LOGO_PATH;
  // user_id= 111122
  login_check:boolean = false;
  signvalue: FormControl = new FormControl();

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  firstnameFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastnameFormControl = new FormControl('', [
    Validators.required,
  ],);
  dobFormControl = new FormControl('', [
    Validators.required,
  ]);
  passFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),


    // this.show=false
  ]);

  passConFormControl = new FormControl('', [
    Validators.compose([Validators.required]),
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
    // Validators.value()
  ]);
  product:any;
  showDetails: boolean;
  constructor(private router: Router,
              private dialogue: MatDialog,private activatedroute:ActivatedRoute,
              private UploadsService: UploadsService,
              private http : HttpClient,
              private AuthenticationService: AuthenticationService
              ) {}

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.product=data;
      this.logoPath = AppConfig.LOGO_PATH;
      document.getElementById('logo-image').innerHTML = '<img src="'+this.logoPath+'" class="logos" />'
      document.getElementById("header").style.display = ""
      var element = document.getElementById(this.product.page);
      element.style.borderBottom = "thick solid"
      element.style.borderColor ="#00ABF3" ;
  })
  }
  register(isValid,password,email,name){

    if(isValid){
      this.AuthenticationService.register(name,email,password).subscribe(
        data => {
           this.dialogue.open(ConfirmationComponent,
            {
              width: "500px",
              data: {type: "Congratulations",id:"",confirmation_line:"We've sent account verification link to your email address. Please click on the link given in the email to verify your account <br>If you didn't receive email,<a href=''> click</a> here to resend the verification email.",first_btn:'Continue',second_btn:'No'}
            });
        }
      )
    }
    else{

    }

  }

  go_to_signup(){
    this.router.navigateByUrl("/signup")
  }

  google_login(){
    this.AuthenticationService.google_login().subscribe(
      data =>
      {
        console.log(data);
      }
    )
  }

  pageSignup(){
    if(this.product.page==="signup"){
      return "signUplist pageConfirm"
    }
    else{
      return "signUplist"
    }
  }
  pageLogin(){
    if(this.product.page==="login"){
      return "signUplist pageConfirm"
    }
    else{
      return "signUplist"
    }
  }
  check(length){
    if(length===0){
      return "none"
    }
    else if(length < 8){
      this.show = false;
      return "weak"

    }
    else if(length < 10){
      return "medium"
    }
    else{
      return "strong"
    }
  }

  strength(length){
    if(length < 8){
      return "Weak"
    }
    else if(length <10){
      return "Medium"
    }
    else{
      return "Strong"
    }
  }
  openGuidelinesDialogue()
  {
     this.dialogue.open(GuidelinesPopupComponent);
  }
  selectedCategory(i) {
    //selecting category
    this.router.navigateByUrl("/"+i)

    var element = document.getElementById(i);
    element.style.borderBottom = "thick solid"
    element.style.borderColor ="#00ABF3" ;

}
error(truth){
  if(truth){
    return "password errorBorder"
  }
  else{
    return "password"
  }
}
errorPass(password){
  var decimal1=  '(?=.*[a-z])(?=.*[A-Z])';
  var decimal2=  '(?=.*[0-9])';
  var decimal3=  '(?=.*[$@$!%*?&])';
  if(!password.match(decimal1)){
    return "uppercase and lowercase letter"
  }
  else if(!password.match(decimal2)){
    return "letters and numbers"
  }
  else if(!password.match(decimal3)){
    return " atleast one special character"
  }
  else{
    return "minumum of  8 characters"
  }


}
errorMessage(password,confirm){
  this.passNo = password.length
  var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8}$/;
if(password === confirm)
{
return "All Set";
}
else
{
return "All Not Set";
}

}
iconClass(displayT){
  if(displayT){
    return "btn btns"
  }
  else{
    return "grey"
  }
}


login(email,password){
  this.AuthenticationService.login(email,password).subscribe(
    data => {
      console.log(data);
      if(data.loginSuccess === true){
      localStorage.setItem("token",JSON.stringify(data))
      this.router.navigateByUrl("/courses")
      }
      else{
        this.login_check = true;
      }
    }
  )

}


}
