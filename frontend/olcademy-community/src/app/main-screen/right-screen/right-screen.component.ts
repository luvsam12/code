import { Router } from '@angular/router';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';
import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-right-screen',
  templateUrl: './right-screen.component.html',
  styleUrls: ['./right-screen.component.scss']
})
export class RightScreenComponent implements OnInit {
  blogs = [];
  currentDate;
  start = 5;
  rightScreenState: any; //0 - all category; 1 - tests
  active: any;
  routeDetails: any;
  routes: any;
  constructor(private BlogsListService: BlogsListService, private router:Router, private store: Store<AppState>) {
        //reading data stored in ngrx store
        this.routeDetails = this.store.select("currentRoute");
        this.routeDetails.subscribe((element) => {
          let lastElementIndex = element.length - 1;
          this.routes = element[lastElementIndex];

          if(this.routes){
            this.active = this.routes.name;

            // if(this.active === "myfeed" || this.active === "myfeed/myposts" || this.active === "myfeed/mynetwork" || this.active === "myfeed/mynetwork/connections" || this.active === "myfeed/mynetwork/sent_request" || this.active === "myfeed/mynetwork/received_request" || this.active === "myfeed/bookmarked" || this.active === "myfeed/interest" || this.active === "network"  || this.active === "network/connections" || this.active === "network/sent_request" || this.active === "network/received_request" || this.active === "notification" ){
            //   this.rightScreenState = 0;
            // }
            if(this.active === "tests" || this.active === "tests/my-attempts" || this.active === "tests/solved-questions" || this.active === "tests/upload-questions"){
              this.rightScreenState = 1;
            }
            else{
              this.rightScreenState = 0;
            }
          }
        })
  }

  ngOnInit(): void {
    this.BlogsListService.getBlogsData().subscribe(
      data => {
        this.blogs = data["blogs"];
      }
    )
  }
  showMore_visibility(){
    if(this.blogs.length > 5){
      return true
    }
      return false;
  };

  show_more(){
    var element = document.getElementById("check_more").innerText
    if(element === "show more")
    {
    this.start += 3;
    document.getElementById("check_more").innerText = "show less"
    }
    else if(element === "show less")
    {
      this.start -= 3
      document.getElementById("check_more").innerText = "show more"
    }
  }
  go_to_blog(id){
    this.router.navigate(["/show-blog"],{ queryParams: { id: id}}); //navigated to selected tab
    // (id);
    // this.BlogsListService.put_particular_blog_id(id);
    // this.router.navigateByUrl("/show-blog"); //navigated to selected tab

  }
  blog_life(publishedOn)
  {
    this.currentDate = formatDate(Date() ,'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');
    let current_year = this.currentDate[0]+this.currentDate[1]+this.currentDate[2]+this.currentDate[3];
    let published_year = publishedOn[0]+publishedOn[1]+publishedOn[2]+publishedOn[3];
    let current_month = this.currentDate[5]+this.currentDate[6];
    let published_month = publishedOn[5]+publishedOn[6];

    let current_date = this.currentDate[8]+this.currentDate[9];
    let published_date = publishedOn[8]+publishedOn[9];
    if(current_year == published_year)
    {
      if(current_month == published_month)
      {
        if( current_date == published_date)
          {
              let current_hr = this.currentDate[11]+this.currentDate[12];
              let published_hr = publishedOn[11]+publishedOn[12];
              if(current_hr == published_hr)
              {
                    let current_min = this.currentDate[14]+this.currentDate[15];
                    let published_min = publishedOn[14]+publishedOn[15];
                    if( current_min == published_min)
                    {
                      let current_sec = this.currentDate[17]+this.currentDate[18];
                      let published_sec = publishedOn[17]+publishedOn[18];
                      return current_sec - published_sec + " seconds ago.";
                    }
                    else
                    {
                      return current_min - published_min + " minutes ago."
                    }
              }
              else
              {
                 return current_hr - published_hr + " hrs ago."
              }
          }
          else if(current_date - published_date < 7)
          {
            return current_date - published_date + " days ago."
          }
          else if( current_date - published_date < 14)
          {
            return "A week ago."
          }
      }
    }

      return publishedOn[8]+publishedOn[9]+publishedOn[7]+publishedOn[5]+publishedOn[6]+publishedOn[4]+publishedOn[0]+publishedOn[1]+publishedOn[2]+publishedOn[3];
  }

}
