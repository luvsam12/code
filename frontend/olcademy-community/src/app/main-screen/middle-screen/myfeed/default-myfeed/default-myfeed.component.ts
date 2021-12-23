import { Component, OnInit } from '@angular/core';
import { CancomponentLeave } from 'src/app/shared/services/authdeactive.guard';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-default-myfeed',
  templateUrl: './default-myfeed.component.html',
  styleUrls: ['./default-myfeed.component.scss']
})
export class DefaultMyfeedComponent implements OnInit, CancomponentLeave {

  canleave(): boolean {
    if(this.myfeeds.dirty){
     return  window.confirm("Warning: Changes you made may not be saved.");
       }
     return true;
 }


  categories = ['IT & Software','Business','Personality Development','Design','Marketing','Lifestyle','Photography','Health & Fitness','Teacher Training','Music','Academics','Language','Examination','Others'];
  category_selected: string;
  categories_1 = ['Select 1','Select 2','Select 3','Select 4','Select 5','Select 6','Select 7','Select 8','Select 9'];

  index1=1;
  index2=2;
  index3=3;

  idx_user1=1
  idx_user2=2
  idx_user3=3
  idx_user4=4
  idx_user5=5

  myfeeds: FormControl = new FormControl;
  isShow:boolean = false;
  constructor() { }

  ngOnInit(): void {

  }

  nextcardcourse(){
    var indexup1=this.index1+3;
    var indexup2=this.index2+3;
    var indexup3=this.index3+3;
    if(this.index1<7){
    document.getElementById("course_card_"+this.index1).style.display="none";
    document.getElementById("course_card_"+this.index2).style.display="none";
    document.getElementById("course_card_"+this.index3).style.display="none";
    document.getElementById("course_card_"+indexup1).style.display="block";
    document.getElementById("course_card_"+indexup2).style.display="block";
    document.getElementById("course_card_"+indexup3).style.display="block";
    this.index1+=3;

    this.index2+=3;

    this.index3+=3;

  }
  if(this.index1>1 ){
    document.getElementById("left_course").style.opacity="1";
  }else if(this.index1<=1){
    document.getElementById("left_course").style.opacity="0.5";
  }
  if(indexup3>=9){
    document.getElementById("right_course").style.opacity="0.5";
  } else if(indexup3<9){
    document.getElementById("right_course").style.opacity="1";
  }
}



  prevcardcourse(){
    var idx1=this.index1-3;
    var idx2=this.index2-3;
    var idx3=this.index3-3;
    if(this.index1>=4){
    document.getElementById("course_card_"+this.index1).style.display="none";
    document.getElementById("course_card_"+this.index2).style.display="none";
    document.getElementById("course_card_"+this.index3).style.display="none";
    document.getElementById("course_card_"+idx1).style.display="block";
    document.getElementById("course_card_"+idx2).style.display="block";
    document.getElementById("course_card_"+idx3).style.display="block";
    this.index1-=3;

    this.index2-=3;

    this.index3-=3;

  }
  if(idx1<=1){
    document.getElementById("left_course").style.opacity="0.5";
  }else if(idx1>1){
    document.getElementById("left_course").style.opacity="1";
  }
  if(this.index3<9){
    document.getElementById("right_course").style.opacity="1";
  }else if(this.index3>=9){
    document.getElementById("right_course").style.opacity="0.5";
  }
}

  prevcarduser(){
    var idx1=this.idx_user1-5;
    var idx2=this.idx_user2-5;
    var idx3=this.idx_user3-5;
    var idx4=this.idx_user4-5;
    var idx5=this.idx_user5-5;
    if(this.idx_user1>=6){
    document.getElementById("user_card_"+this.idx_user1).style.display="none";
    document.getElementById("user_card_"+this.idx_user2).style.display="none";
    document.getElementById("user_card_"+this.idx_user3).style.display="none";
    document.getElementById("user_card_"+this.idx_user4).style.display="none";
    document.getElementById("user_card_"+this.idx_user5).style.display="none";
    document.getElementById("user_card_"+idx1).style.display="block";
    document.getElementById("user_card_"+idx2).style.display="block";
    document.getElementById("user_card_"+idx3).style.display="block";
    document.getElementById("user_card_"+idx4).style.display="block";
    document.getElementById("user_card_"+idx5).style.display="block";
    this.idx_user1-=5;
    this.idx_user2-=5;
    this.idx_user3-=5;
    this.idx_user4-=5;
    this.idx_user5-=5;

  }
  if(idx1<=1){
    document.getElementById("left_user").style.opacity="0.5";
  }else if(idx1>1){
    document.getElementById("left_user").style.opacity="1";
  }
  if(this.idx_user5<15){
    document.getElementById("right_user").style.opacity="1";
  }else if(this.idx_user5>=15){
    document.getElementById("right_user").style.opacity="0.5";
  }
  }

  nextcarduser(){
    var idx1=this.idx_user1+5;
    var idx2=this.idx_user2+5;
    var idx3=this.idx_user3+5;
    var idx4=this.idx_user4+5;
    var idx5=this.idx_user5+5;
    if(this.idx_user1<11){
    document.getElementById("user_card_"+this.idx_user1).style.display="none";
    document.getElementById("user_card_"+this.idx_user2).style.display="none";
    document.getElementById("user_card_"+this.idx_user3).style.display="none";
    document.getElementById("user_card_"+this.idx_user4).style.display="none";
    document.getElementById("user_card_"+this.idx_user5).style.display="none";
    document.getElementById("user_card_"+idx1).style.display="block";
    document.getElementById("user_card_"+idx2).style.display="block";
    document.getElementById("user_card_"+idx3).style.display="block";
    document.getElementById("user_card_"+idx4).style.display="block";
    document.getElementById("user_card_"+idx5).style.display="block";
    this.idx_user1+=5;
    this.idx_user2+=5;
    this.idx_user3+=5;
    this.idx_user4+=5;
    this.idx_user5+=5;

  }
  if(this.idx_user1>1 ){
    document.getElementById("left_user").style.opacity="1";
  }else if(this.idx_user1<=1){
    document.getElementById("left_user").style.opacity="0.5";
  }
  if(idx5>=15){
    document.getElementById("right_user").style.opacity="0.5";
  } else if(idx5<15){
    document.getElementById("right_user").style.opacity="1";
  }
  }

  toggleDisplay(){
    if(!this.isShow){
    document.getElementById('ul').style.display = "block" ;
    document.getElementById('ul').style.opacity = "1" ;
    document.getElementById('ul').style.visibility = "visible" ;
    this.isShow = true;
    }
    else{
      document.getElementById('ul').style.display = "none" ;
      document.getElementById('ul').style.opacity = "0" ;
      document.getElementById('ul').style.visibility = "hidden" ;
      this.isShow = false;
      }

  }

  toggleDisplay1(){
    if(!this.isShow){
    document.getElementById('ul1').style.display = "block" ;
    document.getElementById('ul1').style.opacity = "1" ;
    document.getElementById('ul1').style.visibility = "visible" ;
    this.isShow = true;
    }
    else{
      document.getElementById('ul1').style.display = "none" ;
      document.getElementById('ul1').style.opacity = "0" ;
      document.getElementById('ul1').style.visibility = "hidden" ;
      this.isShow = false;
      }
  }

  toggleDisplay2(){
    if(!this.isShow){
    document.getElementById('ul2').style.display = "block" ;
    document.getElementById('ul2').style.opacity = "1" ;
    document.getElementById('ul2').style.visibility = "visible" ;
    this.isShow = true;
    }
    else{
      document.getElementById('ul2').style.display = "none" ;
      document.getElementById('ul2').style.opacity = "0" ;
      document.getElementById('ul2').style.visibility = "hidden" ;
      this.isShow = false;
      }
  }
}
