import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteConfirmPopupComponent } from 'src/app/popups/delete-confirm-popup/delete-confirm-popup.component';
import { ReportSpamPopupComponent } from 'src/app/popups/report-spam-popup/report-spam-popup.component';
import { ShareOnFeedPopupComponent } from 'src/app/popups/share-on-feed-popup/share-on-feed-popup.component';
import { SharePopupComponent } from 'src/app/popups/share-popup/share-popup.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';
import { ForumListService } from 'src/app/shared/services/forum-list.service';
import {formatDate } from '@angular/common';
import { SigninPopupComponent } from 'src/app/popups/signin-popup/signin-popup.component';
import { UploadMediaPopupComponent } from 'src/app/popups/upload-media-popup/upload-media-popup.component';
import { CategoryService } from 'src/app/shared/services/category-list.service';
import { ConfirmationComponent } from 'src/app/popups/confirmation/confirmation.component';
import { PostActionsService } from 'src/app/shared/services/post-actions.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.scss']
})
export class ForumDetailComponent implements OnInit {
  @ViewChild('backdrop') backdrop: ElementRef;
  @ViewChild('tagName', {static: false}) tagName: ElementRef;
  @ViewChild('f', {static: false}) f: NgForm;

  counterArr;
  counterArrTwo;
  minicarouselCounterArrTwo;
  minicarouselCounterArr;
  isEditing: boolean = false;
  forum_post;
  shareOptionHidden: boolean = true;
  menuHidden: boolean = true;
  answerPanel: boolean = false;
  nums = [1, 2, 3, 4];
  params;
  author_profile_image_path;
  is_data_available: boolean = false;
  // author_name;
  // current_user_id;
  category1 = ['Update Forum','Turn Off Notification','Delete Forum'];
  category2  = ['Follow User','Turn Off Notification','Report'];
  forum_option_category  = ['Follow User','Turn Off Notification','Report Forum'];
  user_details: any = this.AuthenticationService.get_user_info();


  currentDate;

  i:any;
  var:any;
  truth =true;
  bookmarkTruth = true;

  media_tag_check = [];
  media_tag_check_clone = [];
  media_check = [];
  media_check_clone = [];
  del_media_array = []
  forum_image_content_text = "";

  categories;
  category_selected = "";

  tags = [];
  tags_clone = [];
  post_type = "Forums";
  category_selected_id;

  constructor(
    private route: Router, 
    private activatedRoute: ActivatedRoute,
    private dialog:MatDialog,
    private BlogsListService: BlogsListService,
    private AuthenticationService: AuthenticationService,
    private CategoryService: CategoryService,
    private postAction: PostActionsService
  ) { }

  ngOnInit(){
    this.activatedRoute.queryParams.filter(params => params.id).subscribe(params => {
      this.params = params.id;
      if(params.edit === "false") {
        this.isEditing = false;
      }
      if(params.edit === "true") {
        this.isEditing = true;
      }
      console.log(params);
    });

    this.BlogsListService.get_particular_blog(this.params).subscribe(
                    mainData => {
                      const data= mainData[0]
        this.AuthenticationService.getCurrentUserImage(data.user_id._id).subscribe(
          data => {
            this.author_profile_image_path = data.data.profile_image_path;
            this.is_data_available = true;
          }
        )

        // getting all the comments(to be added)

        this.forum_post = data;
        this.counterArr = this.forum_post.media_tag.length;
        this.counterArrTwo = 0;
        this.minicarouselCounterArr = this.forum_post.media_tag.length - 7;
        this.minicarouselCounterArrTwo = 0;
        this.media_check = this.forum_post.media;
        this.media_tag_check = this.forum_post.media_tag;
        this.media_tag_check_clone = [...this.media_tag_check];
        this.media_check_clone = [...this.media_check];
        this.forum_image_content_text = this.forum_post.forum_image_content;
        this.tags = this.forum_post.hashtags;
        this.tags_clone = [...this.tags];
        this.category_selected = this.forum_post.category.name;
     
        console.log("forum_post", this.forum_post);
      },
      error => {
        console.log(error);
      }
    )
    if(this.AuthenticationService.isLoggedIn()) {
      this.user_details = this.AuthenticationService.get_user_info();
    }

    this.CategoryService.getCategoriesData().subscribe(
      data => {
        console.log(data);
        this.categories = [...data];
        console.log(this.categories);
      }
    )
  }

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
  
            this.BlogsListService.delete_kudos(post).subscribe(
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
            this.BlogsListService.post_likes(post).subscribe(
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
        this.BlogsListService.delete_kudos(post).subscribe(
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
  
        this.BlogsListService.post_likes(post).subscribe(
          data => {
            // console.log(data);
          }
        )
      }
       }
       else{
          const dialogRef = this.dialog.open(SigninPopupComponent);
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
          this.BlogsListService.delete_bookmark(post).subscribe(
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

        this.BlogsListService.post_bookmark(current_user_id,post).subscribe(
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
         this.BlogsListService.delete_bookmark(post).subscribe(
           data => {
             console.log(data);
           }
         )
     }
     else if(this.i==y&&event.target.style.color !== "rgb(0, 171, 243)"){
       event.target.style.color = "rgb(0, 171, 243)";
         document.getElementById(z).textContent = " Bookmark";

      this.BlogsListService.post_bookmark(current_user_id,post).subscribe(
        data => {
          console.log(data);
        }
      )
    }


   }
   else{
    const dialogRef = this.dialog.open(SigninPopupComponent);
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


  openuploadDialogue(item)
    {
      if(this.AuthenticationService.isLoggedIn) {
        const dialogRef = this.dialog.open(UploadMediaPopupComponent,
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
                this.media_tag_check_clone.push(result[1][i])
                this.media_check_clone.push(result[0][i]);
                this.forum_image_content_text += result[1][i];
              }
            }
          }
        );
      }else{
        this.dialog.open(SigninPopupComponent);
      }
    }

    addTag() {
      if(this.tagName.nativeElement.value === '') {
        return
      }else{
        const index = this.tags_clone.findIndex(eachTag => eachTag === `#${this.tagName.nativeElement.value}`);
        if(index === -1){
          this.tags_clone.push(`#${this.tagName.nativeElement.value}`);
        }else{
          return;
        }
      }
    }
  removeTag(i) {
    this.tags_clone.splice(i, 1);
  }

  editPost() {
    this.isEditing = !this.isEditing;
  }

  goBack() {
    this.route.navigate(['/forum']);
  }
  goBackToShow(id) {
    this.media_tag_check_clone = [...this.media_tag_check];
    this.media_check_clone = [...this.media_check];
    this.tags_clone = [...this.tags];
    this.route.navigate(["/forum-detail"],{ queryParams: { id: id, edit: "false"}});
  }

  prevoiusImage(id, refName: HTMLInputElement) {
    let carouselImages = document.querySelectorAll(`.a${id} img`);
    let width = carouselImages[0].clientWidth;

    if(this.counterArrTwo <= 0) return;
    refName.style.transition ="transform 0.4s ease-in-out";
    this.counterArrTwo--;
    refName.style.transform = `translateX(${+(-width*this.counterArrTwo)}px)`;

  }

  nextImage(id, refName: HTMLInputElement) {
    let carouselImages = document.querySelectorAll(`.a${id} img`);
    let width = carouselImages[0].clientWidth;

    if(this.counterArrTwo >= (this.counterArr - 1)) return;
    refName.style.transition = `transform 0.4s ease-in-out`;
    this.counterArrTwo++;
    refName.style.transform = `translateX(${-width * this.counterArrTwo}px)`;  
  }

  checkPreviousBtnDisable() {
    if(this.counterArrTwo === 0) {
      return true;
    }else{
      return false;
    }
  }

  checkNextBtnDisable() {
    if(this.counterArrTwo === this.counterArr-1) {
      return true;
    }else{
      return false;
    }
  }

  miniCarouselMoveLeft(id, refName:HTMLInputElement) {
    let carouselImages = document.querySelectorAll(`.b${id} img`);
    let width = carouselImages[0].clientWidth + 16;

    if(this.minicarouselCounterArrTwo <= 0) return;
    refName.style.transition ="transform 0.4s ease-in-out";
    this.minicarouselCounterArrTwo--;
    refName.style.transform = `translateX(${+(-width*this.minicarouselCounterArrTwo)}px)`;
  }  


  miniCarouselMoveRight(id, refName:HTMLInputElement) {
    let carouselImages = document.querySelectorAll(`.b${id} img`);
    let width = carouselImages[0].clientWidth + 16;
    if(this.minicarouselCounterArrTwo >= (this.minicarouselCounterArr)) return;
    refName.style.transition = `transform 0.4s ease-in-out`;
    this.minicarouselCounterArrTwo++;
    refName.style.transform = `translateX(${-width * this.minicarouselCounterArrTwo}px)`;
  }

  checkMiniPreviousBtnDisable() {
    if(this.minicarouselCounterArrTwo === 0) {
      return true;
    }else{
      return false;
    }
  }

  checkMiniNextBtnDisable() {
    if(this.minicarouselCounterArrTwo === this.minicarouselCounterArr) {
      return true;
    }else{
      return false;
    }
  }


  goToImage(id, j, refName: HTMLInputElement) {
    this.counterArrTwo = 0;
    let carouselImages = document.querySelectorAll(`.a${id} img`);
    let width = carouselImages[0].clientWidth;
    refName.style.transition = `transform 0.4s ease-in-out`;
    refName.style.transform = `translateX(${-width * (j - this.counterArrTwo)}px)`;
    this.counterArrTwo = j;
  }

  onShowMenu() {
    if(this.menuHidden) {
      this.backdrop.nativeElement.style.display = "block";
      this.menuHidden = false;
    }else{
      this.backdrop.nativeElement.style.display = "none";
      this.menuHidden = true;
    }
  }

  Issame(author_id,followers){
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

  deleteImage(i) {
    this.media_tag_check_clone.splice(i, 1);
    this.del_media_array.push(this.media_check_clone[i]);
    this.media_check_clone.splice(i, 1);
  }

  topicNameError: boolean = false;
  questionError: boolean = false;

  updatePost() {
    console.log(this.f);
    if(this.AuthenticationService.isLoggedIn()) {
      this.topicNameError = false;
      this.questionError = false;
      
      console.log(this.user_details);
      if(this.f.invalid) {
        console.log(this.f);
        if(!this.f.form.controls.updated_question.valid) {
          this.questionError = true;
        }

        if(!this.f.form.controls.updated_post_title.valid) {
          this.topicNameError = true;
        }
        return;
      }

      let formData = new FormData();
      formData.append("user_id", this.user_details.authdata.user_id);
      formData.append("post_title", this.f.value.updated_post_title);
      formData.append("author_name", this.user_details.authdata.full_name);
      formData.append('post_content',this.f.value.updated_question);
      formData.append('post_type',this.post_type);
      for(var i=0;i<this.categories.length;i++)
      {
        if(this.category_selected === this.categories[i].name)
        {
          this.category_selected_id = this.categories[i]._id
        }
      }
    //   // console.log(this.category_selected_id);
      formData.append('category',this.category_selected_id);
      if(this.tags_clone.length >0)
      {
        for( var index =0; index < this.tags_clone.length; index++){
          formData.append('hashtags',this.tags_clone[index])
        }
      }
      else
      {
        formData.append('hashtags',"empty")
      }
  
      if(this.media_check_clone.length > 0)
      {
        for( var index =0; index < this.media_check_clone.length; index++)
        {
          formData.append('media',this.media_check_clone[index])
          formData.append('media_tag',this.media_tag_check_clone[index])
        }
      }
      else
      {
        formData.append('media',"empty")
        formData.append('media_tag',"empty")
      }

      if(this.del_media_array.length > 0)
        {
          for( var index =0; index < this.del_media_array.length; index++)
          {
            formData.append('del_media_array', this.del_media_array[index])
          }
        }
        else
        {
          formData.append('del_media_array',"empty")
        }
  
  
    //   console.log(formData);
      this.dialog.open(ConfirmationComponent,
        {
          width: "500px",
          data: {type: "Update",id: this.params,confirmation_line:'Are you sure you want to publish this Forum Thread?',first_btn:'Update',second_btn:'Discard', formData: formData}
        }
      ); 
    }
    else {
      this.dialog.open(SigninPopupComponent);
    }
  }

  isHidden() {
    return !this.menuHidden;
  }

  closeSettings() {
    this.menuHidden = true;
    this.backdrop.nativeElement.style.display = "none";
  }

  reportSpam() {
    const dialogRef = this.dialog.open(ReportSpamPopupComponent, {
      width: "500px",
      data: {type: "comment"}
    });
  }

  shareThread() {
    this.shareOptionHidden = !this.shareOptionHidden;
  }

  showShareOptions() {
    return !this.shareOptionHidden;
  }

  isAnswerPanelHidden() {
    return this.answerPanel;
  }

  toShowComment() {
    if(!this.answerPanel) {
      this.answerPanel = true;
    }
  }

  openSharePopup() {
    const dialogRef = this.dialog.open(SharePopupComponent, {
      width: "500px",
      height: "300px"
    });
  }
  openShareOnFeedPopup(id) {
    const dialogRef = this.dialog.open(ShareOnFeedPopupComponent, {
      width: "800px",
      height: "600px",
      data: { id: +id }
    })
  }
}
