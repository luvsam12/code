import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';
import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import 'rxjs/add/operator/filter';
import { PostActionsService } from 'src/app/shared/services/post-actions.service';
import { MatDialog } from '@angular/material/dialog';
import { SigninPopupComponent } from 'src/app/popups/signin-popup/signin-popup.component';
import { ReportSpamPopupComponent } from 'src/app/popups/report-spam-popup/report-spam-popup.component';
@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  blogList;
  author_image_path: Array<string> = [];
  currentDate ;
  user_details;
  user_image;
  commentList: any;
  i;
  var;
  truth;
  current_user_id;
  bookmarkTruth;
  is_comment_available:Boolean =false;
  is_reply_available:Boolean =false;
  show_more_clicked:boolean = false;
  post_content_show_more:boolean = false;
  blog_options_category  = ['Update Blog','Turn Off Notification','Delete Blog'];
  filter = ['Popularity', 'Latest'];
  selected_filter = 'Popularity';
  forum_option_category  = ['Update Forum','Turn Off Notification','Delete Forum'];

  constructor(private BlogsListService: BlogsListService,
              private AuthenticationService: AuthenticationService,
              private router: Router,
              private blogService: BlogsListService,
              private dialogue: MatDialog,
              private postAction: PostActionsService
              ) { }

  ngOnInit(): void {

    this.BlogsListService.get_user_blogs().subscribe(
      data => {
        for(let datas of data)
      {
        this.AuthenticationService.getCurrentUserImage(datas.user_id).subscribe(
          data => {
            this.author_image_path.push(data.data.profile_image_path);
          }
        )
      }
        this.blogList = data;
        console.log(data)
      },

      (error) => {
        console.log(error);
      }
    );

    if(this.AuthenticationService.isLoggedIn()){
      this.AuthenticationService.getCurrentUserImage(this.user_details.authdata.user_id).subscribe(
        data =>
        {
          this.user_image = data.data.profile_image_path;
        }
      )
              }
  }

  go_to_profile(user_id){
    console.log(user_id);
    this.router.navigate(["/user-page"],{ queryParams:{id:user_id}});

  }


  show_text(media,i){
    var content = ""
    content = document.getElementById("thread-desc-"+i).textContent
     document.getElementById("short-content-"+i).textContent = content
     if(media.length > 0){
     document.getElementById("short-content-first-media-"+i).innerHTML = media[0]
     }
     else{
      document.getElementById("short-content-first-media-"+i).style.background = "grey"
     }
     if(content.length >270){
      document.getElementById("post-content-show-more-"+i).style.display = "block"
      document.getElementById("post-content-show-more-"+i).style.position = "absolute"
      document.getElementById("post-content-show-more-"+i).style.marginLeft = "40%"
      document.getElementById("post-content-show-more-"+i).style.boxShadow = "-10px 0px 10px white"

    }
  }

  Issame(author_id){
    this.postAction.Issame(author_id);
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

  go_to_blog(id){
    this.router.navigate(["/show-blog"],{ queryParams: { id: id}}); //navigated to selected tab
  }

  commentDisplay(id,i){
    if(!(document.getElementById("comment"+id).style.display === "block")){
      document.getElementById("comment"+id).style.display = "block";
      this.blogService.getCommentsData(id).subscribe(
        bata => {
           this.commentList = bata;
          for(let comment of this.commentList.comments){
            this.blogService.getReplyData(comment._id).subscribe(
              reply => {
                comment.reply = reply;

              }
            )

          }
          this.blogList[i].comment = this.commentList;
        }

      );
      this.blogList[i].commentShow = true
    }
    else{
      document.getElementById("comment"+id).style.display = "none";

      this.blogList[i].commentShow = false
    }

  }

  check_number(value){
    return this.postAction.check_number_count(value);
  }

  option_function(category,id,user_id){
    var check_change_option =  this.postAction.option_function(category,id,user_id);
    if(check_change_option && category === 'Follow User'){
      user_id.following.push(this.AuthenticationService.get_user_info().authdata.user_id)
    }
    if(check_change_option && category === 'Unfollow User'){
      const index = user_id.following.indexOf(this.AuthenticationService.get_user_info().authdata.user_id);
      if (index > -1) {
        user_id.following.splice(index, 1);
      }
    }
  }

  bookmarkCheck(bookmarks){
    if(this.AuthenticationService.isLoggedIn()){
      let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;
      for(var s=0;s<bookmarks.length;s++){
        if(current_user_id == bookmarks[s]){
          return "fas fa-bookmark selected";
        }
      }
      return "fas fa-bookmark";
    }
    else{
      return "fas fa-bookmark ";
    }

  }

  thumsUp(kudos,id){
    if(this.AuthenticationService.isLoggedIn()){
      let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;

      for(var s=0;s<kudos.length;s++){
        if(current_user_id == kudos[s]){


          return "fas fa-thumbs-up selected";
        }
      }

      return "fas fa-thumbs-up ";
    }
    else{
      return "fas fa-thumbs-up ";
    }

  }

  reportSpam(id){
    if(this.AuthenticationService.isLoggedIn()){
    const dialogRef = this.dialogue.open(ReportSpamPopupComponent, {
      width: "500px",
      data: {type: "comment",id:id}
    });
  }
  else{
    const dialogRef = this.dialogue.open(SigninPopupComponent);
  }

  }

  expand(id){
    if(document.getElementById("expand"+id).style.display !== "block"){
     document.getElementById("expand"+id).style.display = "block";
     document.getElementById("expandS"+id).style.display = "none";
    }
    else{
     document.getElementById("expand"+id).style.display = "-webkit-box";
     document.getElementById("expandS"+id).style.display = "block";
    }
  }

  checkShow(id){
    if(document.getElementById("expand"+id).textContent.length > 218){
      return true
    }
    else{
      return false
    }
  }

  postReply(id,post_id,i){
    this.postAction.postReply(id,post_id,i,this.blogList,this.commentList,this.user_details)
  }

  commentInput(id){
    if(!(document.getElementById("comment-reply"+id).style.display === "block")){
      document.getElementById("comment-reply"+id).style.display = "block";
    }
    else{
      document.getElementById("comment-reply"+id).style.display = "none";
    }
  }

  postComment(id,i){
    this.postAction.postComment(id,i,this.blogList,this.commentList,this.user_details)
  }

  //
  kudos(event,post ,x,y){
    this.postAction.kudos(event,post ,x,y)
  }
  //
  commentLike(event,post ,x,y){
    this.postAction.commentLike(event,post ,x,y);
  }
  //
  bookmark(event,post ,x,y,z){
    this.postAction.bookmark(event,post ,x,y,z)
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

go_to_forum(id){
  this.router.navigate(["/forum-detail"],{ queryParams: { id: id, edit: "false"}});
 }
 check_forum_length(data){
  if(data.length>=300){
    return true;
  }else{
    return false;
  }
}



}