import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";

@Component({
  selector: 'app-left-screen',
  templateUrl: './left-screen.component.html',
  styleUrls: ['./left-screen.component.scss']
})
export class LeftScreenComponent implements OnInit {
  active: any;
  leftScreenState: any ; //0 - all category; 1 - user details; 2 - test categories;
  routeDetails: any;
  routes: any;

  constructor(private router: Router, private store: Store<AppState>) {

    //reading data stored in ngrx store
    this.routeDetails = this.store.select("currentRoute");
    this.routeDetails.subscribe((element) => {
      let lastElementIndex = element.length - 1;
      this.routes = element[lastElementIndex];

      if(this.routes){
        this.active = this.routes.name;

        if(this.active === "myfeed" || this.active === "myfeed/myposts" || this.active === "myfeed/mynetwork" || this.active === "myfeed/mynetwork/connections" || this.active === "myfeed/mynetwork/sent_request" || this.active === "myfeed/mynetwork/received_request" || this.active === "myfeed/bookmarked" || this.active === "myfeed/interest" || this.active === "network"  || this.active === "network/connections" || this.active === "network/sent_request" || this.active === "network/received_request" || this.active === "notification" ){
          this.leftScreenState = 0;
        }
        else if(this.active === "tests" || this.active === "tests/my-attempts" || this.active === "tests/solved-questions"  || this.active === "tests/upload-questions"){
          this.leftScreenState = 2;
        }
        else{
          this.leftScreenState = 1;
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
