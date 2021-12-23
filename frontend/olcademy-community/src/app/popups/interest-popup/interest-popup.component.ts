import { CategoryService } from './../../shared/services/category-list.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AppConfig } from 'src/app/shared/services/app.config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interest-popup',
  templateUrl: './interest-popup.component.html',
  styleUrls: ['./interest-popup.component.scss']
})
export class InterestPopupComponent implements OnInit {
  Categories;
  constructor(private AuthenticationService: AuthenticationService,
              private CategoryService: CategoryService) { }

   interests: Array<boolean> = [false,false,false,false,false,false,false,false,false,false,false,false,false,false]

  ngOnInit(): void {
    this.CategoryService.getCategoriesData().subscribe(
      data => {
        this.Categories = data;
      }
    )
    document.getElementById('itsoftware-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('business-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('personality-development-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('design-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('marketing-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('lifestyle-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('photography-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('health-and-fitness-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('teacher-training-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('music-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('academics-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('language-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('examination-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
    document.getElementById('others-img').style.backgroundImage = "url("+AppConfig.INTEREST_SPRITES+")";
  }

  follow_click(id){
    var current_interest_state = document.getElementById('interest-Follow-'+id).innerHTML;
    if(current_interest_state =="Follow")
    {
        document.getElementById('interest-Follow-'+id).style.backgroundColor = "white";
        document.getElementById('interest-Follow-'+id).style.color = "black";
        document.getElementById('interest-Follow-'+id).style.border = "1px solid #00ABF3"
        document.getElementById('interest-Follow-'+id).innerHTML = "Unfollow";
        this.interests[id] = true;
        var element = <HTMLInputElement> document.getElementById("interest-apply");
                       element.disabled = false;
        document.getElementById('interest-apply').style.backgroundColor = "#00ABF3";

    }
    else if( current_interest_state == "Unfollow")
    {
      document.getElementById('interest-Follow-'+id).style.backgroundColor = "#00ABF3";
        document.getElementById('interest-Follow-'+id).style.color = "white";
        document.getElementById('interest-Follow-'+id).style.border = "none"
        document.getElementById('interest-Follow-'+id).innerHTML = "Follow";
        this.interests[id] = false;
       //this part is to check if any of the  interest is selected or not .
       // if none of the interest is selected then it willl set the follow button to be disabled.
        var count = 0;
        for(var i=0;i<14;i++)
        {
          if(this.interests[i] === true)
          {
            count = 1;
          }
        }
        if(count === 0)
        {
          var element = <HTMLInputElement> document.getElementById("interest-apply");
          element.disabled = true;
          document.getElementById('interest-apply').style.backgroundColor = "#d3d3d3";
        }

    }
  }

  click_apply(){
    let array =[]
    this.interests.forEach((element,index) => {if(element == true){
      array.push(this.Categories[index]._id);
    }
    });
    this.AuthenticationService.post_interest(array).subscribe(
      data => {
      }
    )
  }


  public ngAfterViewChecked(): void {

      }

}
