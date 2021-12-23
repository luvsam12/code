import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

const MY_ATTEMPTS_STATS = [
  { name: "Number of Mock Tests", type: "mock-test", number: 11 },
  { name: "Avg. Score of Mock Tests", type: "mock-test", number: 129 },
  { name: "Number of Practice Questions", type: "practice-que", number: 14 },
  { name: "Avg. Score of Practice Questions", type: "practice-que", number: 150 }
]

@Component({
  selector: 'app-tests-right-screen',
  templateUrl: './tests-right-screen.component.html',
  styleUrls: ['./tests-right-screen.component.scss']
})
export class TestsRightScreenComponent implements OnInit {

  myAttempts = [];
  currentState: any; //0 - my-attempts; 1 - solved-questions; 2 - upload-questions
  active: any;
  routeDetails: any;
  routes: any;


  constructor(private router:Router, private store: Store<AppState>) { 
        //reading data stored in ngrx store
        // this.routeDetails = this.store.select("currentRoute");
        // this.routeDetails.subscribe((element) => {
        //   let lastElementIndex = element.length - 1;
        //   this.routes = element[lastElementIndex];
    
        //   if(this.routes){
        //     this.active = this.routes.name;
    
        //     // if(this.active === "myfeed" || this.active === "myfeed/myposts" || this.active === "myfeed/mynetwork" || this.active === "myfeed/mynetwork/connections" || this.active === "myfeed/mynetwork/sent_request" || this.active === "myfeed/mynetwork/received_request" || this.active === "myfeed/bookmarked" || this.active === "myfeed/interest" || this.active === "network"  || this.active === "network/connections" || this.active === "network/sent_request" || this.active === "network/received_request" || this.active === "notification" ){
        //     //   this.rightScreenState = 0;
        //     // }
        //     if(this.active === "assessment" || this.active === "assessment/my-attempts" || this.active === "assessment/solved-questions"){
        //       this.currentState = 1;
        //     }
        //     else{
        //       this.currentState = 0;
        //     }
        //   }
        // })
  }

  ngOnInit(): void {
    this.myAttempts = MY_ATTEMPTS_STATS;
  }

  goToMyAttempts() {
    this.router.navigate(['/tests', 'my-attempts']);
  }

  goToSolvedQuestions() {
    this.router.navigate(['/tests', 'solved-questions']);
  }

  goToUploadQuestions() {
    this.router.navigate(['/tests', 'upload-questions']);
  }

}
