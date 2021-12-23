import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadMediaPopupComponent } from 'src/app/popups/upload-media-popup/upload-media-popup.component';

@Component({
  selector: 'app-upload-questions',
  templateUrl: './upload-questions.component.html',
  styleUrls: ['./upload-questions.component.scss']
})
export class UploadQuestionsComponent implements OnInit {

  toggle = 1;

  ans = [0,0,0,0] ;

  Question = '';
  option1 = 'Single Question';
  option2 = 'Single Question';
  option3 = '';
  option4 = '';
  FinalCorrect = '';

  Questionmulti = '';
  option1multi = 'Single Question';
  option2multi = 'Single Question';
  option3multi = '';
  option4multi = '';
  FinalCorrectmulti = '';

  Questiontext = '';
  Answertext = '';


  constructor(private dialogue: MatDialog) { }

  ngOnInit(): void {
  }

  questioncopy() {
    this.Question = (<HTMLInputElement>(
      document.getElementById('singlechoicecard1')
    )).value;
    document.getElementById('put_ques').innerHTML = this.Question;
    document.getElementById('put_ques_fin').innerHTML = this.Question;

    this.option1 = (<HTMLInputElement>document.getElementById('option1')).value;
    if ((<HTMLInputElement>document.getElementById('option2')).value != '') {
      this.option2 = (<HTMLInputElement>(
        document.getElementById('option2')
      )).value;
    } else {
    }
    if ((<HTMLInputElement>document.getElementById('option3')).value != '') {
      this.option3 = (<HTMLInputElement>(
        document.getElementById('option3')
      )).value;
    }
    if ((<HTMLInputElement>document.getElementById('option4')).value != '') {
      this.option4 = (<HTMLInputElement>(
        document.getElementById('option4')
      )).value;
    }

    document.getElementById('put_op1').innerHTML = this.option1;
    document.getElementById('put_op2').innerHTML = this.option2;
    document.getElementById('put_op1_fin').innerHTML = this.option1;
    document.getElementById('put_op2_fin').innerHTML = this.option2;

    if (this.option3 != '') {
      document.getElementById('put_op3').innerHTML = this.option3;
      document.getElementById('put_op3_fin').innerHTML = this.option3;
    } else {
      document.getElementById('showornot1').style.display = 'none';
      document.getElementById('showornot1_fin').style.display = 'none';
    }

    if ((<HTMLInputElement>document.getElementById('option4')).value != '') {
      document.getElementById('put_op4').innerHTML = this.option4;
      document.getElementById('put_op4_fin').innerHTML = this.option4;
    } else {
      document.getElementById('showornot2').style.display = 'none';
      document.getElementById('showornot2_fin').style.display = 'none';
    }

    document.getElementById('card1').style.display = 'none';
    document.getElementById('card2').style.display = 'block';
  }

  option_correct() {
    var checkRadio = document.querySelector(
      'input[name="fin_single_1"]:checked'
    );

    if (checkRadio != null) {
      var idd = (<HTMLInputElement>checkRadio).id;
      document.getElementById('put_op11_check').innerHTML = ' ';
      document.getElementById('put_op12_check').innerHTML = ' ';
      document.getElementById('put_op13_check').innerHTML = ' ';
      document.getElementById('put_op14_check').innerHTML = ' ';

      document.getElementById('put_op11_check_fin').innerHTML = ' ';
      document.getElementById('put_op12_check_fin').innerHTML = ' ';
      document.getElementById('put_op13_check_fin').innerHTML = ' ';
      document.getElementById('put_op14_check_fin').innerHTML = ' ';

      document.getElementById(idd + '_check').innerHTML = 'check';
      document.getElementById(idd + '_check_fin').innerHTML = 'check';
      this.FinalCorrect = (<HTMLInputElement>checkRadio).id + '_check_fin';
    }
  }
  questionfinal() {
    document.getElementById('card2').style.display = 'none';
    document.getElementById('card3').style.display = 'block';
  }

  questioncopymulti() {
    this.Questionmulti = (<HTMLInputElement>(
      document.getElementById('question_tb_ques_multi')
    )).value;
    document.getElementById('put_ques_multi').innerHTML = this.Questionmulti;
    document.getElementById("put_ques_fin_multi").innerHTML = this.Questionmulti;

    this.option1multi = (<HTMLInputElement>(
      document.getElementById('option1_multi')
    )).value;

    if (
      (<HTMLInputElement>document.getElementById('option2_multi')).value != ''
    ) {
      this.option2multi = (<HTMLInputElement>(
        document.getElementById('option2_multi')
      )).value;
    }

    if (
      (<HTMLInputElement>document.getElementById('option3_multi')).value != ''
    ) {
      this.option3multi = (<HTMLInputElement>(
        document.getElementById('option3_multi')
      )).value;
    }

    if (
      (<HTMLInputElement>document.getElementById('option4_multi')).value != ''
    ) {
      this.option4multi = (<HTMLInputElement>(
        document.getElementById('option4_multi')
      )).value;
    }

    document.getElementById('put_op1_multi').innerHTML = this.option1multi;
    document.getElementById('put_op2_multi').innerHTML = this.option2multi;
    document.getElementById("put_op1_fin_multi").innerHTML = this.option1multi;
    document.getElementById("put_op2_fin_multi").innerHTML = this.option2multi;

    if (
      (<HTMLInputElement>document.getElementById('option3_multi')).value != ''
    ) {
      document.getElementById('put_op3_multi').innerHTML = this.option3multi;
      document.getElementById("put_op3_fin_multi").innerHTML = this.option3multi;
    } else {
      document.getElementById('showornot1_multi').style.display = 'none';
      document.getElementById("showornot1_fin_multi").style.display="none";
    }

    if (
      (<HTMLInputElement>document.getElementById('option4_multi')).value != ''
    ) {
      document.getElementById('put_op4_multi').innerHTML = this.option4multi;
      document.getElementById("put_op4_fin_multi").innerHTML = this.option4multi;
    } else {
      document.getElementById('showornot2_multi').style.display = 'none';
      document.getElementById("showornot2_fin_multi").style.display="none";
    }

    document.getElementById("card4").style.display="none";
    document.getElementById("card5").style.display="block";
  }

  multicardswap() {
    document.getElementById('card5').style.display = 'none';
    document.getElementById('card6').style.display = 'block';

    if(this.ans[0]==1)
    document.getElementById("put_op11_check_fin_multi").style.display='block';

    if(this.ans[1]==1)
    document.getElementById("put_op12_check_fin_multi").style.display='block';

    if(this.ans[2]==1)
    document.getElementById("put_op13_check_fin_multi").style.display='block';

    if(this.ans[3]==1)
    document.getElementById("put_op14_check_fin_multi").style.display='block';
  }



  multianstoggle(vari: string) {
    var element =document.getElementById('put_op1' + vari + '_multi_check');
    var idx=Number(vari) - 1;
    if ( element.style.display == 'block') {
      element.style.display ='none';
      this.ans[idx]=0;
    }
    else {
      element.style.display ='block';
      this.ans[idx]=1;
    }

  }


  toggleonoff() {
    if (this.toggle == 1) {
      document.getElementById('card1').style.display = 'block';
      document.getElementById('card4').style.display = 'none';
      --this.toggle;
    } else {
      document.getElementById('card1').style.display = 'none';
      document.getElementById('card4').style.display = 'block';
      ++this.toggle;
    }
  }

  clear(idd: string) {
    document.getElementById(idd).style.display = 'none';
  }

  // These two functions are for text replies
  questioncopytext() {
    this.Questiontext = (<HTMLInputElement>(
      document.getElementById('textques')
    )).value;
    document.getElementById('textques1').innerHTML = this.Questiontext;
    document.getElementById('textques2').innerHTML = this.Questiontext;

    this.Answertext = (<HTMLInputElement>(
      document.getElementById('textans')
    )).value;
    document.getElementById('textans1').innerHTML = this.Answertext;
    document.getElementById('textans2').innerHTML = this.Answertext;

    document.getElementById('card7').style.display = 'none';
    document.getElementById('card8').style.display = 'block';
  }

  textcardswap() {
    document.getElementById('card8').style.display = 'none';
    document.getElementById('card9').style.display = 'block';
  }

  openuploadDialogue(item)
    {
      const dialogRef = this.dialogue.open(UploadMediaPopupComponent,
        {
          backdropClass: 'transparent',
          data: {name: item}
        });

    }

   Questiontype(element : string)
   {
     var ele=Number(element);
     var element1=document.getElementById("card1");
     var element2=document.getElementById("card7");
     var element3=document.getElementById("card10");
     var element4=document.getElementById("card13");

     element1.style.display='none';
     document.getElementById("card2").style.display='none';
     document.getElementById("card3").style.display='none';
     document.getElementById("card4").style.display='none';
     document.getElementById("card5").style.display='none';
     document.getElementById("card6").style.display='none';
     element2.style.display='none';
     document.getElementById("card8").style.display='none';
     document.getElementById("card9").style.display='none';
     element3.style.display='none';
     element4.style.display='none';

     if(ele==1)
     element1.style.display='block';

     if(ele==2)
     element2.style.display='block';

     if(ele==3)
     element3.style.display='block';

     if(ele==4)
     element4.style.display='block';

   }
}
