import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';

const QUESTIONS_SET = [
  {
    examType: "CAT",
    type: "MCQ", 
    questionsInformations: {
      questionStatement: "Two ships are sailing in the sea on the two sides of a lighthouse. The angle of elevation of the top of the lighthouse is observed from the ships are 30° and 45° respectively. If the lighthouse is 100 m high, the distance between the two ships is:",
      options: ["lorem1", "lorem2", "lorem3", "lorem4"],
      answerpercentage: [
        { 
          option: "A", 
          percentage: 70
        },
        { 
          option: "B", 
          percentage: 15
        },
        { 
          option: "C", 
          percentage: 10
        },
        { 
          option: "D", 
          percentage: 5
        }
      ],
      answerSelected: "",
      showMoreContent: false
    },
    questionLevel: "Beginner"
  }, 
  {
    examType: "CAT",
    type: "MCQ", 
    questionsInformations: {
      questionStatement: "Which was the 1st non Test playing country to beat India in an international match?",
      options: ["canada", "srilanka", "zimbabwe", "east africa"],
      answerpercentage: [
        { 
          option: "A", 
          percentage: 50
        },
        { 
          option: "B", 
          percentage: 50
        },
        { 
          option: "C", 
          percentage: 0
        },
        { 
          option: "D", 
          percentage: 0
        }
      ],
      answerSelected: "",
      showMoreContent: false
    },
    questionLevel: "Intermediate"
  },   
  {
    examType: "CAT",
    type: "MCQ", 
    questionsInformations: {
      questionStatement: "Former Australian captain Mark Taylor has had several nicknames over his playing career. Which of the following was NOT one of them?",
      options: ["tubby", "stodge", "helium bat", "stumpy"],
      answerpercentage: [
        { 
          option: "A", 
          percentage: 3
        },
        { 
          option: "B", 
          percentage: 10
        },
        { 
          option: "C", 
          percentage: 80
        },
        { 
          option: "D", 
          percentage: 7
        }
      ],
      answerSelected: "",
      showMoreContent: false
    },
    questionLevel: "Expert"
  }, 
  {
    examType: "CAT",
    type: "MAQ",
    questionsInformations: {
      questionStatement: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, beatae.",
      options: ["tubby", "stodge", "helium bat", "stumpy"],
      answerSelected: "",
      showMoreContent: false

    },
    questionLevel: "intermediate"
  },
  {
    examType: "CAT",
    type: "MAQ",
    questionsInformations: {
      questionStatement: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, beatae.",
      options: ["tubby", "stodge", "helium bat", "stumpy"],
      answerSelected: "",
      showMoreContent: false

    },
    questionLevel: "Expert"
  },
  {
    examType: "CAT",
    type: "MAQ",
    questionsInformations: {
      questionStatement: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, beatae.",
      options: ["canada", "srilanka", "zimbabwe", "east africa"],
      answerSelected: "",
      showMoreContent: false
    },
    questionLevel: "Beginner"
  },
  {
    examType: "CAT",
    type: "Subjective",
    questionsInformations: {
      questionStatement: "Two ships are sailing in the sea on the two sides of a lighthouse. The angle of elevation of the top of the lighthouse is observed from the ships are 30° and 45° respectively. If the lighthouse is 100 m high, the distance between the two ships is: ",
      moreContentPresent: true,
      moreContent: "The passage content will be written here. The New Education Policy (NEP) policy approved by the Union Cabinet on Wednesday is set to bring a slew of major changes including allowing top foreign universities to set up campuses to India, a greater proportion of students getting vocational education and a move towards institutes including IITs turning multi-disciplinary. The policy aims at making “India a global knowledge superpower”",
      attachmentsPresent: true,
      attachments: [],
      showMoreContent: false
    },
    questionLevel: "Beginner"
  },
  {
    examType: "CAT",
    type: "Comprehension",
    questionsInformations: {
      questionStatement: "Two ships are sailing in the sea on the two sides of a lighthouse. The angle of elevation of the top of the lighthouse is observed from the ships are 30° and 45° respectively. If the lighthouse is 100 m high, the distance between the two ships is: ",
      questions: [
        {
          statement: "Questions 1",
          options: ["Options 1", "Options 2", "Options 3", "Options 4"],
          answerSelected: ""
        },
        {
          statement: "Questions 2",
          options: ["Options 1", "Options 2", "Options 3", "Options 4"],
          answerSelected: ""
        },
        {
          statement: "Questions 3",
          options: ["Options 1", "Options 2", "Options 3", "Options 4"],
          answerSelected: ""
        },
        {
          statement: "Questions 4",
          options: ["Options 1", "Options 2", "Options 3", "Options 4"],
          answerSelected: ""
        },
      ],
      showMoreContent: false
    },
    questionLevel: "Intermediate"
  },
  {
    examType: "CAT",
    type: "speakingSkill",
    questionsInformations: {
      questionStatement: "Choose a plant or animal that you have learned about and that you think is interesting.",
      showMoreContent: ""
    },
    questionLevel: "Beginner"
  }
]

@Component({
  selector: 'app-solved-questions',
  templateUrl: './solved-questions.component.html',
  styleUrls: ['./solved-questions.component.scss']
})
export class SolvedQuestionsComponent implements OnInit {

  @ViewChild('carouselSlides', {static: false}) carouselSlides:ElementRef;
  @ViewChild('minicarouselslides', {static: false}) minicarouselslides:ElementRef;
  @ViewChild('uploadAudio', {static: false}) uploadAudio:ElementRef;
  allQuestions = [];
  showMoreFilters: boolean = false;
  areResponsesHidden: boolean = true;
  areSpeakingSkillsResponsesHidden: boolean = true;
  isDisabled: boolean = false;
  audioFile = "";
  audiofiletype = ""

  moreFilter = [
    {
      filterName: "Categories",
      showMoreFilters: false,
      subfilterOptions: [
        {
          name: "CAT",
          quantity: 3522
        },
        {
          name: "GATE",
          quantity: 1948
        },
        {
          name: "PTE",
          quantity: 840
        },
        {
          name: "UPSC",
          quantity: 401
        }
      ]
    }, 
    {
      filterName: "Select",
      showMoreFilters: false,
      subfilterOptions: [
        {
          name: "VARC",
          quantity: 3522
        },
        {
          name: "DILR",
          quantity: 1948
        },
        {
          name: "QA",
          quantity: 840
        }
      ]
    }, 
    {
      filterName: "Level",
      showMoreFilters: false,
      subfilterOptions: [
        {
          name: "All Levels",
          quantity: 3522
        },
        {
          name: "Beginner",
          quantity: 1948
        },
        {
          name: "Intermediate",
          quantity: 840
        },
        {
          name: "Expert",
          quantity: 401
        }
      ]
    }
  ];

  counter: number = 0;
  minicarouselCounter:number = 1;
  minicarouselReverseCounter: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.allQuestions = QUESTIONS_SET;
    this.counter = 1;

  }

  shouldShowMoreFilters() {
    return this.showMoreFilters;
  }

  toggleMoreFilters() {
    this.showMoreFilters = !this.showMoreFilters;
  }

  showOptions(i) {
    // this.showMoreContent = !this.showMoreContent;
    this.allQuestions[+i].questionsInformations.showMoreContent = !this.allQuestions[+i].questionsInformations.showMoreContent;
  }

  showResponses() {
    this.areResponsesHidden = !this.areResponsesHidden;
  }

  showResponsesofSpeakingSkills() {
    this.areSpeakingSkillsResponsesHidden = !this.areSpeakingSkillsResponsesHidden;
  }

  toggleSubFilters(i) {
    this.moreFilter[+i].showMoreFilters = !this.moreFilter[+i].showMoreFilters;
  }

  prevoiusImage() {
    const carouselImages = document.querySelectorAll(".carousel-slides img");
    let width = carouselImages[0].clientWidth;

    if(this.counter <= 0) return;
    this.carouselSlides.nativeElement.style.transition ="transform 0.4s ease-in-out";
    this.counter--;

    this.carouselSlides.nativeElement.style.transform = `translateX(${+(-width*this.counter)}px)`;

  }

  nextImage() {
    const carouselImages = document.querySelectorAll(".carousel-slides img");
    let width = carouselImages[0].clientWidth;

    if(this.counter >= (carouselImages.length - 1)) return;
    this.carouselSlides.nativeElement.style.transition = `transform 0.4s ease-in-out`;
    // carouselSlides.style.transition = `transform 0.4s ease-in-out`;
    this.counter++;
    this.carouselSlides.nativeElement.style.transform = `translateX(${-width * this.counter}px)`;  
  }

  checkPreviousBtnDisable() {
    if(this.counter === 0) {
      return true;
    }else{
      return false;
    }
  }

  checkNextBtnDisable() {
    if(this.counter === 6) {
      return true;
    }else{
      return false;
    }
  }

  fileInserted() {
    this.audiofiletype = this.uploadAudio.nativeElement.files[0].type;
  }

  miniCarouselMoveRight() {
    if(this.minicarouselCounter < 4){
      this.minicarouselslides.nativeElement.style.transition ="transform 0.4s ease-in-out";
      this.minicarouselslides.nativeElement.style.transform = `translateX(-${126.891*this.minicarouselCounter}px)`;
      this.minicarouselCounter++;
    }else{
      return;
    }

  }

  // miniCarouselMoveleft() {
  //   if(this.minicarouselCounter > 0 ) {
  //     this.minicarouselslides.nativeElement.style.transition ="transform 0.4s ease-in-out";
  //     console.log(126.891*this.minicarouselReverseCounter); 
  //     this.minicarouselslides.nativeElement.style.transform = `translateX(-${126.891*(-this.minicarouselCounter)}px)`;
  //     this.minicarouselReverseCounter++;
  //     this.minicarouselCounter--;
  //   }
  //   else{
  //     this.minicarouselReverseCounter = 0;
  //     return;
  //   }
  // }

}
