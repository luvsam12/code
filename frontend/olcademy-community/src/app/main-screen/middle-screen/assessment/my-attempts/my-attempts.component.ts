import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

const MOCK_TESTS = [
  {testName: "CAT Mock Test 4", date: "20 Dec, 2020", questionsAttempted: 101, timeSpent: 70, totalScore: 180, percentile: 91},
  {testName: "CAT Mock Test 3", date: "13 Dec, 2020", questionsAttempted: 90, timeSpent: 85, totalScore: 160, percentile: 87},
  {testName: "CAT Mock Test 2", date: "6 Dec, 2020", questionsAttempted: 115, timeSpent: 87, totalScore: 200, percentile: 100},
  {testName: "CAT Mock Test 1", date: "30 Nov, 2020", questionsAttempted: 80, timeSpent: 89, totalScore: 150, percentile: 90}
]

const PRACTICE_QUESTIONS = [
  { 
    examType: "CAT",
    type: "MCQ",
    questionsInformations: {
      questionStatement: "Two ships are sailing in the sea on the two sides of a lighthouse. The angle of elevation of the top of the lighthouse is observed from the ships are 30° and 45° respectively. If the lighthouse is 100 m high, the distance between the two ships is: ",
      questionLevel: "Beginner",
      responses: {
        answerpercentage: [
          { 
            option: "A", 
            percentage: 3,
            correctAnswer: false
          },
          { 
            option: "B", 
            percentage: 10,
            correctAnswer: false
          },
          { 
            option: "C", 
            percentage: 80,
            correctAnswer: true
          },
          { 
            option: "D", 
            percentage: 7,
            correctAnswer: false
          }
        ]
      },
      showResponses: false
    }
  },
  { 
    examType: "GATE",
    type: "Subjective",
    questionsInformations: {
      questionStatement: "Two ships are sailing in the sea on the two sides of a lighthouse. The angle of elevation of the top of the lighthouse is observed from the ships are 30° and 45° respectively. If the lighthouse is 100 m high, the distance between the two ships is: ",
      questionLevel: "Beginner",
      responses: [
        {
          name: "Ankit Biswal", 
          answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, facilis. Odit eius quas a laudantium nihil eos iure, enim autem ea architecto, aliquam impedit dignissimos accusantium cupiditate. Eveniet, fugiat alias! Omnis porro consequuntur inventore doloremque eveniet possimus aliquid assumenda soluta!",
          likes: 60
        },
        {
          name: "Random User 1", 
          answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, facilis. Odit eius quas a laudantium nihil eos iure, enim autem ea architecto, aliquam impedit dignissimos accusantium cupiditate. Eveniet, fugiat alias! Omnis porro consequuntur inventore doloremque eveniet possimus aliquid assumenda soluta!",
          likes: 10
        },
        {
          name: "Random User 2", 
          answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, facilis. Odit eius quas a laudantium nihil eos iure, enim autem ea architecto, aliquam impedit dignissimos accusantium cupiditate. Eveniet, fugiat alias! Omnis porro consequuntur inventore doloremque eveniet possimus aliquid assumenda soluta!",
          likes: 23
        },
        {
          name: "Random User 3", 
          answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, facilis. Odit eius quas a laudantium nihil eos iure, enim autem ea architecto, aliquam impedit dignissimos accusantium cupiditate. Eveniet, fugiat alias! Omnis porro consequuntur inventore doloremque eveniet possimus aliquid assumenda soluta!",
          likes: 34
        },
      ],
      showResponses: false
    }
  }
  // { 
  //   examType: "UPSC",
  //   type: "MAQ",
  //   questionsInformations: {
  //     questionStatement: "Two ships are sailing in the sea on the two sides of a lighthouse. The angle of elevation of the top of the lighthouse is observed from the ships are 30° and 45° respectively. If the lighthouse is 100 m high, the distance between the two ships is: ",
  //     questionLevel: "Beginner"
  //   }
  // }
]

const GRAPH_DATA = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  data: [12, 19, 3, 5, 2, 3, 7, 30, 25, 28, 2, 19, 20, 23, 24, 12, 25, 25, 37, 15, 16, 17, 30, 19, 20]
}

@Component({
  selector: 'app-my-attempts',
  templateUrl: './my-attempts.component.html',
  styleUrls: ['./my-attempts.component.scss', '../solved-questions/solved-questions.component.scss']
})
export class MyAttemptsComponent implements OnInit {
  showMoreFilters: boolean = false;
  mockTests = [];
  practiceQuestions = [];
  currentState: string = "mock test";
  graphLabels = [];
  graphData = [];
  // graphDataDivider: number = 0;
  // dividedLabels = [];
  responsesStatus: string = "Show";
  constructor() { }

  ngOnInit(): void {
    this.mockTests = MOCK_TESTS;
    this.practiceQuestions = PRACTICE_QUESTIONS;
    this.graphData = GRAPH_DATA.data;
    this.graphLabels = GRAPH_DATA.labels;
  }

  // shouldShowMoreFilters() {
  //   return this.showMoreFilters;
  // }

  // toggleMoreFilters() {
  //   this.showMoreFilters = !this.showMoreFilters;
  // }

  switchToMockTest() {
    document.querySelector(".mock-test-switcher").classList.toggle("active");
    document.querySelector(".practice-questions").classList.toggle("active");
    this.currentState = "mock test";
  }

  switchToPracticeMode() {
    document.querySelector(".mock-test-switcher").classList.toggle("active");
    document.querySelector(".practice-questions").classList.toggle("active");
    this.currentState = "practice questions";

    // if(this.graphLabels.length <= 10) {
    //   this.graphDataDivider = this.graphLabels.length;
    //   this.dividedLabels = this.graphLabels.map( (label, i) => i <= this.graphDataDivider - 1 );
    //   // at this point dividedLabels === graphLabels
    // }
    // if(this.graphLabels.length > 10 && this.graphLabels.length <= 30) {
    //   this.graphDataDivider = this.graphLabels.length/5;
    //   this.dividedLabels = this.graphLabels.map( (label, i) => {
    //     if(i <= this.graphDataDivider - 1) {
    //       return 
    //     }
    //   } );
    // }

    setTimeout(() => {
      let ctx = document.getElementById('myChart');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: this.graphLabels,
            datasets: [{
                label: 'No. of Questions',
                data: this.graphData,
                borderWidth: 1,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgb(1, 169, 242)',
                pointBackgroundColor: 'rgb(1, 169, 242)'
            }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: "No. Of Questions"
              }  
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: "No. Of weeks"
              }
            }]
          },
          animation: {
            duration: 0 // general animation time
          },
          hover: {
            animationDuration: 0 // duration of animations when hovering an item
          },
          responsiveAnimationDuration: 0 ,
          elements: {
            line: {
              tension: 0 // disables bezier curves
            }
          }
        }
    });
    }, 0)
  }

  moveGraphBack() {

  }

  moveGraphForward() {

  }

  toggleResponses(i) {
    this.practiceQuestions[+i].questionsInformations.showResponses = !this.practiceQuestions[+i].questionsInformations.showResponses;
    if(this.practiceQuestions[+i].questionsInformations.showResponses === true) {
      this.responsesStatus = "Hide";
    }else{
      this.responsesStatus = "Show";
    }
  }

}
