import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/popups/confirmation/confirmation.component';
import { ReportSpamPopupComponent } from 'src/app/popups/report-spam-popup/report-spam-popup.component';
import { SigninPopupComponent } from 'src/app/popups/signin-popup/signin-popup.component';
import { UploadMediaPopupComponent } from 'src/app/popups/upload-media-popup/upload-media-popup.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';
import { CategoryService } from 'src/app/shared/services/category-list.service';
import { ForumListService } from 'src/app/shared/services/forum-list.service';
import {formatDate } from '@angular/common';
import { PostActionsService } from 'src/app/shared/services/post-actions.service';
import { LoginDetails } from 'src/app/shared/services/login-details.model';
import {FormControl} from '@angular/forms';
import { CancomponentLeave } from 'src/app/shared/services/authdeactive.guard';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit,CancomponentLeave {
   canleave(): boolean {
     if(this.eventName.dirty){
      return  window.confirm("Warning: Changes you made may not be saved.");
        }
      return true;
  }



  counterArr = [];
  counterArrTwo = [];
  minicarouselCounterArr = [];
  minicarouselCounterArrTwo = [];

  postingImageCounter = 0;
  postingImageTotal;

  miniCarouselPostingImageCounter = 0;
  miniCarouselPostingImageTotal;

  selectedValue: string;
  selectedCar: string;
  filter = ['Popularity', 'Latest'];
  selected_filter = 'Popularity';

  eventName:FormControl = new FormControl();

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  @ViewChild('f', {static: true}) formInputData: NgForm;
  @ViewChild('topicName', {static: true}) topicName: ElementRef;
  @ViewChild('tagName', {static: true}) tagName: ElementRef;

  categories;
  category_selected = "";
  tags: string[] = [];
  imageAddress;
  valid: boolean = false;
  menuHidden: boolean = true;
  sortByDropdownHidden: boolean = true;
  images_store_array = [];
  media_tag_check = [];
  media_check = [];
  forum_image_content_text = "";
  author_image_path: Array<string> = [];
  author_tagline: Array<string> = [];
  forumList = [];
  post_type = "Forums";
  user_id;
  author_name;
  category_selected_id;
  category_selected_error: boolean = false;
  user_details: any = this.AuthenticationService.get_user_info();
  forum_option_category  = ['Follow User','Turn Off Notification','Report Forum'];
  commentId;          //z1
  i:any;
  var:any;
  truth =true;

  bookmarkTruth = true;

  currentDate;

  topicNameError: boolean = false;
  questionError: boolean = false;

  constructor(private dialog: MatDialog,
              private forumService: ForumListService,
              private dialogue: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private blogService: BlogsListService,
              private AuthenticationService: AuthenticationService,
              private CategoryService: CategoryService,
              private postAction: PostActionsService) {
                
               }



  ngOnInit(): void {
    // console.log(this.forumService.get_forums());
    // this.forumsList = this.forumService.get_forums();
      
    if(this.AuthenticationService.isLoggedIn()){
      this.user_id = this.AuthenticationService.get_user_info().authdata.user_id;
      this.author_name = this.AuthenticationService.get_user_info().authdata.full_name;
    }

    this.blogService.getForumsData().subscribe(
      data => {
        for(let datas of data)
        {
          this.AuthenticationService.getCurrentUserImage(datas.user_id._id).subscribe(
            data => {
              this.author_image_path.push(data.data.profile_image_path);
            }
          )

        }

        this.forumList = data;
        this.blogService.getCommentsData(this.forumList[0]._id).subscribe(
          data => {console.log("------d------d");
          
            console.log(data);
            
          }
        )
        console.log(this.forumList);
        for(let post of this.forumList) {
          this.counterArr.push(post.media_tag.length);
          this.counterArrTwo.push(0);
          this.minicarouselCounterArr.push(post.media_tag.length - 5);
          this.minicarouselCounterArrTwo.push(0);
        }
      },
      (error) => {
        console.log(error);
      }
    )

    this.CategoryService.getCategoriesData().subscribe(
      data => {
        this.categories = [...data];
      }
    )

    console.log(this.AuthenticationService.get_user_info());

    this.blogService.getCommentsData(this.commentId).subscribe(
      data => { 
          this.commentId = data  
          console.log(this.commentId);
          
        })
        

  }

  // showPost(postId) {
  //   this.route.navigate(['/forum-detail', +postId]);
  // }


  addTag() {
    if(this.tagName.nativeElement.value === '') {
      return
    }else{
      const index = this.tags.findIndex(eachTag => eachTag === `#${this.tagName.nativeElement.value}`);
      if(index === -1){
        this.tags.push(`#${this.tagName.nativeElement.value}`);
        console.log(this.tags);
      }else{
        return;
      }
    }
  }

  // onChange() {
  //   if(this.topicName.nativeElement.value = '') {
  //     this.topicName.nativeElement.textContent = "Select a topic name";
  //   }
  // }

  onBtnCLick() {
    if(this.formInputData.valid) {
      this.valid = true;
      return !this.valid;
    }else{
      this.valid = false;
      return !this.valid
    }
  }

  onSubmit() {
    if(this.AuthenticationService.isLoggedIn()) {
      this.topicNameError = false;
      this.questionError = false;
      this.category_selected_error = false;
      if(this.formInputData.invalid) {
        console.log(this.formInputData);
        if(!this.formInputData.form.controls.question.valid) {
          this.questionError = true;
        }

        if(!this.formInputData.form.controls.topicName.valid) {
          this.topicNameError = true;
        }
        if(this.category_selected === "") {
          this.category_selected_error = true;
      }
        // console.log("returned!!");
        return;
      }

      if(this.category_selected === "") {
          this.category_selected_error = true;
          return;
      }

      // console.log("Form Data", this.formInputData);
      // console.log("not returned but runned!!");
      let formData = new FormData();
      formData.append("user_id", this.user_id);
      formData.append("post_title", this.formInputData.value.topicName);
      formData.append("author_name", this.author_name);
      for(var i=0;i<this.categories.length;i++)
      {
        if(this.category_selected === this.categories[i].name)
        {
          this.category_selected_id = this.categories[i]._id
        }
      }
      // console.log(this.category_selected_id);
      formData.append('category',this.category_selected_id);
      if(this.tags.length >0)
      {
        for( var index =0; index < this.tags.length; index++){
          formData.append('hashtags',this.tags[index])
        }
      }
      else
      {
        formData.append('hashtags',"empty")
      }

      if(this.media_check.length > 0)
      {
        for( var index =0; index < this.media_check.length; index++)
        {
          if(this.forum_image_content_text.indexOf(this.media_check[index].substring(7)) > -1)
          {
            formData.append('media',this.media_check[index])
            formData.append('media_tag',this.media_tag_check[index])
          }
        }
      }
      else
      {
        formData.append('media',"empty")
        formData.append('media_tag',"empty")
      }

      formData.append('post_content',this.formInputData.value.question);
      formData.append('post_type',this.post_type);

      console.log(formData);
      this.dialogue.open(ConfirmationComponent,
        {
          width: "500px",
          data: {type: "Publish",id:'',confirmation_line:'Are you sure you want to publish this Forum Thread?',first_btn:'Publish',second_btn:'Discard', formData: formData}
        }
      );
    }
    else {
      this.dialog.open(SigninPopupComponent);
    }

  }

  openuploadDialogue(item)
    {
      if(this.AuthenticationService.isLoggedIn) {
        const dialogRef = this.dialogue.open(UploadMediaPopupComponent,
          {
            backdropClass: 'transparent',
            data: {name: item}
          });

        dialogRef.afterClosed().subscribe
        (result =>
          {
            if(result !== "")
            {
              for(var i=0;i<result[1].length;i++)
              {
                this.media_tag_check.push(result[1][i])
                this.media_check.push(result[0][i]);
                this.forum_image_content_text += result[1][i];
              }
              console.log(this.forum_image_content_text);
              let testArr = [];
              for(let image of this.media_check) {
                testArr.push(`http://localhost:7000//uploads/${image.slice(15)}`)
              }
              this.images_store_array = testArr;
              console.log(this.images_store_array);
              this.postingImageTotal = this.images_store_array.length;
              this.miniCarouselPostingImageTotal = this.images_store_array.length - 5;
            }
          }
        );
      }else{
        this.dialog.open(SigninPopupComponent);
      }
    }

  go_to_forum(id){
    this.router.navigate(["/forum-detail"],{ queryParams: { id: id, edit: "false"}});
   }

   check_number(value){
    if(value === 0){
      return ""
    }
    else if(value > 999999){
      return (value/1000000).toFixed(1) +"M"
    }
    else if(value > 999){
      return (value/1000).toFixed(1) +"K"
    }
    else{
      return value
    }
  }

  kudos(event,post ,x,y){;
    if(this.AuthenticationService.isLoggedIn()){
      let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;

        for(this.i=0;this.i<y;this.i = this.i + 1){
    console.log(x[this.i]+"---"+current_user_id)

          if(current_user_id == x[this.i]&&this.truth){
            event.target.style.color = "grey";
            this.var = y;
            if(y==1){
              document.getElementById(post).textContent =" ";
            }
            else{
              document.getElementById(post).textContent = `${this.var-1}`;
            }

            this.blogService.delete_kudos(post).subscribe(
              data => {
                // console.log(data);
              }
            )
            this.truth =false;
            break;
          }
          else if(current_user_id == x[this.i]&&!this.truth){
            // console.log("ssssssssssssssss")
            event.target.style.color = "rgb(0, 171, 243)";
            // this.var = y-1;
            document.getElementById(post).textContent =this.var;
            this.blogService.post_likes(post).subscribe(
              data => {
                // console.log(data);
              }
            )
            this.truth=true;

            break;
           }
       }
       if(event.target.style.color == "rgb(0, 171, 243)"&&this.i==y){
        event.target.style.color = "grey";
        // console.log(",,,,,,,,,,,,,,,,,,,,,"+y);
        this.var = y;
        if(y==0){
          document.getElementById(post).textContent =" ";
        }
        else{
          document.getElementById(post).textContent = (this.var) + " ";
        }
        this.blogService.delete_kudos(post).subscribe(
          data => {
            // console.log(data);
          }
        )
       }
      else if(this.i==y&&event.target.style.color !== "rgb(0, 171, 243)"){
         event.target.style.color = "rgb(0, 171, 243)";
         if(y==0){
          document.getElementById(post).textContent = "1";
         }
         else{
          //  console.log("----------------------------------------------------"+y);
          document.getElementById(post).textContent = (y+1);
         }

        this.blogService.post_likes(post).subscribe(
          data => {
            // console.log(data);
          }
        )
      }
       }
       else{
          const dialogRef = this.dialogue.open(SigninPopupComponent);
       }
     }

    thumsUp(kudos,id){
      if(this.AuthenticationService.isLoggedIn()){
        let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;

        for(var s=0;s<kudos.length;s++){
          if(current_user_id == kudos[s]){


            return "selected";
          }
        }

        return "";
      }
      else{
        return "";
      }

    }

    bookmark(event,post ,x,y,z){
      if(this.AuthenticationService.isLoggedIn()){
       let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;
       console.log(current_user_id);
       console.log(x);

       for(this.i=0;this.i<y;this.i = this.i + 1){
          if(current_user_id == x[this.i]&&this.bookmarkTruth){
         event.target.style.color = "grey";
         document.getElementById(z).textContent = " Bookmark";
            this.blogService.delete_bookmark(post).subscribe(
              data => {
                console.log(data);
              }
            )
            this.bookmarkTruth =false;
            break;
          }
          else if(current_user_id == x[this.i]){
          this.bookmarkTruth =true;
          event.target.style.color = "rgb(0, 171, 243)";
          document.getElementById(z).textContent = " Bookmark";

          this.blogService.post_bookmark(current_user_id,post).subscribe(
            data => {
              console.log(data);
            }
          )
          break;
        }
       }
       if(this.i==y&&event.target.style.color == "rgb(0, 171, 243)"){
         console.log(event.target.style.color);
         event.target.style.color = "grey";
           document.getElementById(z).textContent = " Bookmark";
           this.blogService.delete_bookmark(post).subscribe(
             data => {
               console.log(data);
             }
           )
       }
       else if(this.i==y&&event.target.style.color !== "rgb(0, 171, 243)"){
         event.target.style.color = "rgb(0, 171, 243)";
           document.getElementById(z).textContent = " Bookmark";

        this.blogService.post_bookmark(current_user_id,post).subscribe(
          data => {
            console.log(data);
          }
        )
      }


     }
     else{
       const dialogRef = this.dialogue.open(SigninPopupComponent);
    }
      }

      bookmarkCheck(bookmarks){
        if(this.AuthenticationService.isLoggedIn()){
          let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;
          for(var s=0;s<bookmarks.length;s++){
            if(current_user_id == bookmarks[s]){
              return "selected";
            }
          }
          return " ";
        }
        else{
          return " ";
        }

      }

  //
  forum_life(publishedOn)
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

      return publishedOn.slice(0,10);
  }


  prevoiusImage(id, index, refName: HTMLInputElement) {
    let carouselImages = document.querySelectorAll(`.a${id} img`);
    let width = carouselImages[0].clientWidth;

    if(this.counterArrTwo[index] <= 0) return;
    refName.style.transition ="transform 0.4s ease-in-out";
    this.counterArrTwo[index]--;
    refName.style.transform = `translateX(${+(-width*this.counterArrTwo[index])}px)`;
  }

  nextImage(id, index, refName: HTMLInputElement) {
    let carouselImages = document.querySelectorAll(`.a${id} img`);
    let width = carouselImages[0].clientWidth;

    if(this.counterArrTwo[index] >= (this.counterArr[index] - 1)) return;
    refName.style.transition = `transform 0.4s ease-in-out`;
    this.counterArrTwo[index]++;
    refName.style.transform = `translateX(${-width * this.counterArrTwo[index]}px)`;
  }

  checkPreviousBtnDisable(i) {
    if(this.counterArrTwo[i] === 0) {
      return true;
    }else{
      return false;
    }
  }

  checkNextBtnDisable(i) {
    if(this.counterArrTwo[i] === this.counterArr[i]-1) {
      return true;
    }else{
      return false;
    }
  }

  miniCarouselMoveLeft(id, index, refName:HTMLInputElement) {

    let carouselImages = document.querySelectorAll(`.b${id} img`);
    let width = carouselImages[0].clientWidth + 16;

    if(this.minicarouselCounterArrTwo[index] <= 0) return;
    refName.style.transition ="transform 0.4s ease-in-out";
    this.minicarouselCounterArrTwo[index]--;
    refName.style.transform = `translateX(${+(-width*this.minicarouselCounterArrTwo[index])}px)`;

  }


  miniCarouselMoveRight(id, index, refName:HTMLInputElement) {

    let carouselImages = document.querySelectorAll(`.b${id} img`);
    let width = carouselImages[0].clientWidth + 16;

    if(this.minicarouselCounterArrTwo[index] >= (this.minicarouselCounterArr[index])) return;
    refName.style.transition = `transform 0.4s ease-in-out`;
    this.minicarouselCounterArrTwo[index]++;
    refName.style.transform = `translateX(${-width * this.minicarouselCounterArrTwo[index]}px)`;

  }

  checkMiniPreviousBtnDisable(i) {
    if(this.minicarouselCounterArrTwo[i] === 0) {
      return true;
    }else{
      return false;
    }
  }

  checkMiniNextBtnDisable(i) {
    if(this.minicarouselCounterArrTwo[i] === this.minicarouselCounterArr[i]) {
      return true;
    }else{
      return false;
    }
  }


  goToImage(id, i, j, refName: HTMLInputElement) {
    this.counterArrTwo[i] = 0;

    let carouselImages = document.querySelectorAll(`.a${id} img`);
    let width = carouselImages[0].clientWidth;
    refName.style.transition = `transform 0.4s ease-in-out`;
    refName.style.transform = `translateX(${-width * (j - this.counterArrTwo[i])}px)`;
    this.counterArrTwo[i] = j;
  }


  // posting carousel starts

  prevoiusImagePost(refName: HTMLInputElement) {
    let carouselImages = document.querySelectorAll(".apostCarousel img");
    let width = carouselImages[0].clientWidth;

    if(this.postingImageCounter <= 0) return;
    refName.style.transition ="transform 0.4s ease-in-out";
    this.postingImageCounter--;
    refName.style.transform = `translateX(${+(-width*this.postingImageCounter)}px)`;
  }

  nextImagePost(refName: HTMLInputElement) {
    let carouselImages = document.querySelectorAll(".apostCarousel img");
    let width = carouselImages[0].clientWidth;

    if(this.postingImageCounter >= (this.postingImageTotal - 1)) return;
    refName.style.transition = `transform 0.4s ease-in-out`;
    this.postingImageCounter++;
    refName.style.transform = `translateX(${-width * this.postingImageCounter}px)`;
  }

  checkPreviousBtnDisablePost() {
    if(this.postingImageCounter === 0) {
      return true;
    }else{
      return false;
    }
  }

  checkNextBtnDisablePost() {
    if(this.postingImageCounter === this.postingImageTotal-1) {
      return true;
    }else{
      return false;
    }
  }

  miniCarouselMoveLeftPost(refName:HTMLInputElement) {

    let carouselImages = document.querySelectorAll(".bpostCarousel img");
    let width = carouselImages[0].clientWidth + 16;

    if(this.miniCarouselPostingImageCounter <= 0) return;
    refName.style.transition ="transform 0.2s ease-in-out";
    this.miniCarouselPostingImageCounter--;
    refName.style.transform = `translateX(${+(-width*this.miniCarouselPostingImageCounter)}px)`;

  }


  miniCarouselMoveRightPost(refName:HTMLInputElement) {

    let carouselImages = document.querySelectorAll(".bpostCarousel img");
    let width = carouselImages[0].clientWidth + 16;

    if(this.miniCarouselPostingImageCounter >= (this.miniCarouselPostingImageTotal)) return;
    refName.style.transition = `transform 0.2s ease-in-out`;
    this.miniCarouselPostingImageCounter++;
    refName.style.transform = `translateX(${-width * this.miniCarouselPostingImageCounter}px)`;

  }

  checkMiniPreviousBtnDisablePost() {
    if(this.miniCarouselPostingImageCounter === 0) {
      return true;
    }else{
      return false;
    }
  }

  checkMiniNextBtnDisablePost() {
    if(this.miniCarouselPostingImageCounter === this.miniCarouselPostingImageTotal) {
      return true;
    }else{
      return false;
    }
  }


  goToImagePost(j, refName: HTMLInputElement) {
    this.postingImageCounter = 0;

    let carouselImages = document.querySelectorAll(".apostCarousel img");
    let width = carouselImages[0].clientWidth;
    refName.style.transition = `transform 0.4s ease-in-out`;
    refName.style.transform = `translateX(${-width * (j - this.postingImageCounter)}px)`;
    this.postingImageCounter = j;
  }

  // posting carousel ends

  
  Issame(author_id,followers){
    console.log(followers)
    var result = this.postAction.Issame(author_id);
    if(result){
     this.forum_option_category = ['Update Forum','Turn Off Notification','Delete Forum'];
      return true;
    }
    else if(!result){
     var check_following = false;
       for(var i=0;i<followers.length;i++){
         if(followers[i] === this.user_details.authdata.user_id){
           this.forum_option_category = ['Unfollow User','Turn Off Notification','Report Forum'];
           check_following = true;
         }
       }
       if(check_following === false){
         this.forum_option_category = ['Follow User','Turn Off Notification','Report Forum']
       }
    }
 }

  option_function(category,id,user_id){
    var check_change_option =  this.postAction.option_function(category,id,user_id);
    if(check_change_option && category === 'Follow User'){
      user_id.followers.push(this.AuthenticationService.get_user_info().authdata.user_id)
    }
    if(check_change_option && category === 'Unfollow User'){
      const index = user_id.followers.indexOf(this.AuthenticationService.get_user_info().authdata.user_id);
      if (index > -1) {
        user_id.followers.splice(index, 1);
      }
    }
  }

  onShowMenu() {
    if(this.menuHidden) {
      this.menuHidden = false;
    }else{
      this.menuHidden = true;
    }
  }

  isHidden() {
    return !this.menuHidden;
  }

  openReportPopup() {
    const dialogRef = this.dialog.open(ReportSpamPopupComponent, {
      backdropClass: "transparent",
      width: "500px",
      data: {type: "thread"}
    })
  }

  isSortByDropdownHidden() {
    return !this.sortByDropdownHidden;
  }

  showSortByDropdown() {
    this.sortByDropdownHidden = !this.sortByDropdownHidden

 }
 go_to_profile(user_id){
  //this.router.navigateByUrl("/user-page")
  // console.log(user_id)
  this.router.navigate(["/user-page"],{ queryParams:{id:user_id._id}});
}
checkShow(id){
  if(document.getElementById("expand"+id).textContent.length > 218){
    return true
  }
  else{
    return false
  }
}
check_forum_length(data){
  if(data.length>=300){
    return true;
  }else{
    return false;
  }
}
}
