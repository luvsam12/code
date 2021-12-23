import { AppConfig } from 'src/app/shared/services/app.config';
import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { get_interest } from './../../../../shared/services/get_interest.model';
import { CategoryService } from './../../../../shared/services/category-list.service';
import { InterestService } from './../../../../shared/services/interest.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  constructor( private AuthenticationService: AuthenticationService,
               private CategoryService: CategoryService,
               private InterestService: InterestService) { }
  category_id:Array<string> = [] ;
  saved_interest: Array<string> = [];
  check_follow = [false,false,false,false,false,false,false,false,false,false,false,false,false,false]
  ngOnInit(): void {
    this.CategoryService.getCategoriesData().subscribe(
      data => {
        for(var i=0;i<data.length;i++)
        {
          this.category_id[i] = data[i]._id;
        }
      }
    )
    this.AuthenticationService.get_interest().subscribe(
      data =>{
        this.saved_interest = data.msg;
        for(var i=0;i<this.saved_interest.length;i++)
        {
          for(var y=0;y<this.category_id.length;y++)
          {
            if(this.saved_interest[i] === this.category_id[y])
            {
              this.check_follow[y] = true;
              document.getElementById('interest-Follow-'+y).style.backgroundColor = "white";
              document.getElementById('interest-Follow-'+y).style.color = "black";
              document.getElementById('interest-Follow-'+y).style.border = "1px solid #00ABF3"
              document.getElementById('interest-Follow-'+y).innerHTML = "Unfollow";
            }
          }
        }
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
        this.InterestService.post_interest_myfeed(this.category_id[id]).subscribe(
          data => {
            this.check_follow[id] = true
          }
        )
    }

  unfollow_click(id){
        this.InterestService.delete_interest_myfeed(this.category_id[id]).subscribe(
          data => {
            this.check_follow[id] = false
          }
        )
    }
  }
