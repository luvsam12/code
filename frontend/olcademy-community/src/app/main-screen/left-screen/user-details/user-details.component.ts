import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/shared/services/app.config';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { InterestPopupComponent } from 'src/app/popups/interest-popup/interest-popup.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor( private Router: Router,
               private AuthenticationService: AuthenticationService
             ) { }

// username: any = this.AuthenticationService.get_user_info().authdata.full_name.split(" ")[0];
user_data: any = this.AuthenticationService.get_user_info().authdata;
userimage:any;
  ngOnInit(): void {
    this.AuthenticationService.getCurrentUserImage(this.user_data.user_id).subscribe(
      data => {
        this.userimage = data.data.profile_image_path;
      }
    )
  }

  selectedCategory(i) {
    for(var j=1;j<5;j++){
      document.getElementById(j.toString()).style.borderLeft = "thick solid transparent";
      document.getElementById(j.toString()).style.color = "black";

    }

    let color1: string = '#00ABF3';
    let route : Array<string> = ['myposts','mynetwork','bookmarked','interest']
    //selecting category
    var element = document.getElementById(i);
    element.style.borderLeft = "thick solid #00ABF3"
    element.style.color  = '#00ABF3';
    this.Router.navigateByUrl('/'+'myfeed/'+ route[i-1]);
}


}
