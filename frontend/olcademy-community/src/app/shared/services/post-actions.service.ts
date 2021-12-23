import { NetworkService } from './network.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/popups/confirmation/confirmation.component';
import { ReportSpamPopupComponent } from 'src/app/popups/report-spam-popup/report-spam-popup.component';
import { SigninPopupComponent } from 'src/app/popups/signin-popup/signin-popup.component';
import { AuthenticationService } from './authentication.service';
import { BlogsListService } from './blogs-list.service';
@Injectable({
  providedIn: 'root'
})
export class PostActionsService {
  var:any;
  index;
  truth:Boolean=true;
  bookmarkTruth:Boolean=true
  is_comment_available:Boolean=true;
  is_reply_available:boolean=true;
  current_user_id ;

  constructor(private AuthenticationService:AuthenticationService,
              private blogService:BlogsListService,
              private dialogue: MatDialog,
              private router: Router,
              private NetworkService: NetworkService) {}

  check_login(){
    if(this.AuthenticationService.isLoggedIn()){
      this.current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;
    }
  }
  kudos(event,post ,x,y){
    if(this.AuthenticationService.isLoggedIn()){
      this.check_login();
      for(this.index=0;this.index<y;this.index = this.index + 1){
        if(this.current_user_id == x[this.index]&& this.truth){
          event.target.style.color = "grey";
          this.var = y;
          if(y==1){
            document.getElementById(post).textContent =" Like";
          }
          else{
            document.getElementById(post).textContent = (this.var-1) + " Like";
          }

          this.blogService.delete_kudos(post).subscribe(
            data => {
            }
          )
          this.truth =false;
          break;
        }
        else if(this.current_user_id == x[this.index]){
          event.target.style.color = "rgb(0, 171, 243)";
          document.getElementById(post).textContent =this.var+ " Like";
          this.blogService.post_likes(post).subscribe(
            data => {
            }
          )
          this.truth=true;
          break;
         }
     }
     if(event.target.style.color == "rgb(0, 171, 243)"&&this.index==y){
      event.target.style.color = "grey";
      this.var = y;
      if(y==0){
        document.getElementById(post).textContent =" Like";
      }
      else{
        document.getElementById(post).textContent = (this.var) + " Like";
      }
      this.blogService.delete_kudos(post).subscribe(
        data => {
        }
      )
     }
    else if(this.index==y&&event.target.style.color !== "rgb(0, 171, 243)"){
       event.target.style.color = "rgb(0, 171, 243)";
       if(y==0){
        document.getElementById(post).textContent = "1 Like";
       }
       else{
        document.getElementById(post).textContent = (y+1) + " Like"
       }

      this.blogService.post_likes(post).subscribe(
        data => {
        }
      )
    }
     }
     else{
      const dialogRef = this.dialogue.open(SigninPopupComponent);
    }
  }
  commentLike(event,post ,x,y){
      if(this.AuthenticationService.isLoggedIn()){
        this.check_login();
       for(this.index=0;this.index<y;this.index = this.index + 1){
         if(this.current_user_id == x[this.index]&& this.truth){
           event.target.style.color = "grey";
           this.var = y-1;
           if(y==1){
             document.getElementById("c"+post).textContent ="";
           }
           else{
             document.getElementById("c"+post).textContent = this.var ;
           }

           this.blogService.delete_kudos_c(post).subscribe(
             data => {
             }
           )
           this.truth =false;
           break;
         }
         else if(this.current_user_id == x[this.index]){
           event.target.style.color = "rgb(0, 171, 243)";
           // this.var = y-1;
           document.getElementById("c"+post).textContent =this.var;
           this.blogService.post_likes_comment(post).subscribe(
            data => {
            }
          )
           this.truth=true;
           break;
          }
      }
      if(event.target.style.color == "rgb(0, 171, 243)"&&this.index==y){
       event.target.style.color = "grey";
       this.var = y;
       if(y==0){
         document.getElementById("c"+post).textContent ="";
       }
       else{
         document.getElementById("c"+post).textContent = (this.var);
       }
       this.blogService.delete_kudos_c(post).subscribe(
         data => {
         }
       )
      }
     else if(this.index==y&&event.target.style.color !== "rgb(0, 171, 243)"){
        event.target.style.color = "rgb(0, 171, 243)";
        if(y==0){
         document.getElementById("c"+post).textContent = "1";
        }
        else{
         document.getElementById("c"+post).textContent = (y+1)
        }

        this.blogService.post_likes_comment(post).subscribe(
          data => {
          }
        )
     }
      }
      else{
        const dialogRef = this.dialogue.open(SigninPopupComponent);
     }
  }
  bookmark(event,post ,x,y,z){
    if(this.AuthenticationService.isLoggedIn()){
      this.check_login();
     let current_user_id = this.AuthenticationService.get_user_info().authdata.user_id;

     for(this.index=0;this.index<y;this.index = this.index + 1){
        if(current_user_id == x[this.index]&&this.bookmarkTruth){
       event.target.style.color = "grey";
       document.getElementById(z).textContent = " Bookmark";
          this.blogService.delete_bookmark(post).subscribe(
            data => {
            }
          )
          this.bookmarkTruth =false;
          break;
        }
        else if(current_user_id == x[this.index]){
          this.bookmarkTruth =true;
          event.target.style.color = "rgb(0, 171, 243)";
         document.getElementById(z).textContent = " Bookmark";

      this.blogService.post_bookmark(current_user_id,post).subscribe(
        data => {
        }
      )
      break;
        }
     }
     if(this.index==y&&event.target.style.color == "rgb(0, 171, 243)"){
       event.target.style.color = "grey";
         document.getElementById(z).textContent = " Bookmark";
         this.blogService.delete_bookmark(post).subscribe(
           data => {
           }
         )
     }
     else if(this.index==y&&event.target.style.color !== "rgb(0, 171, 243)"){
       event.target.style.color = "rgb(0, 171, 243)";
         document.getElementById(z).textContent = " Bookmark";

      this.blogService.post_bookmark(current_user_id,post).subscribe(
        data => {
        }
      )
    }


   }
   else{
     const dialogRef = this.dialogue.open(SigninPopupComponent);
  }
  }
  postComment(id,i,blogList,commentList,user_details){
    if(this.AuthenticationService.isLoggedIn()){
      this.check_login();
    this.blogService.post_comment(id,(<HTMLInputElement>document.getElementById("post-comment"+i)).value,user_details.authdata.full_name).subscribe(
     data => {
   this.is_comment_available = false;
   this.is_reply_available= false;
       this.blogService.getCommentsData(blogList[i]._id).subscribe(
         bata => {
           commentList = bata;
           for(let comment of commentList.comments){
             this.blogService.getReplyData(comment._id).subscribe(
               reply => {
                 comment.reply = reply;
                 this.is_reply_available= true;
               }
             )

           }

           blogList[i].comment = commentList;
           this.is_comment_available = true;
           (<HTMLInputElement>document.getElementById("post-comment"+i)).value = ""
         },
         (error) => {
           console.log(error);
         }
       );
     }
   )
    }
    else{
      const dialogRef = this.dialogue.open(SigninPopupComponent);
   }
  }
  postReply(id,post_id,i,blogList,commentList,user_details){
    if(this.AuthenticationService.isLoggedIn()){
      this.check_login();
    this.blogService.post_reply(id,(<HTMLInputElement>document.getElementById("post-comment"+id)).value,post_id,user_details.authdata.full_name).subscribe(
     data => {
       this.blogService.getCommentsData(blogList[i]._id).subscribe(
        bata => {
          commentList = bata;
          for(let comment of commentList.comments){
            this.blogService.getReplyData(comment._id).subscribe(
              reply => {
                comment.reply = reply;
                this.is_reply_available= true;
              }
            )

          }

          blogList[i].comment = commentList;
          this.is_comment_available = true;
          (<HTMLInputElement>document.getElementById("post-comment"+id)).value = ""
        },
        (error) => {
          console.log(error);
        }
      );
     }
   )
    }
    else{
      const dialogRef = this.dialogue.open(SigninPopupComponent);
   }
  }

  Issame(author_id){
    if(this.AuthenticationService.isLoggedIn()){
      this.check_login();
    if(parseFloat(this.AuthenticationService.get_user_info().authdata.user_id) === parseFloat(author_id)){
      return true
    }
    return false
  }
  }

  check_number_count(value){
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

  option_function(category,id,user_id){
    if(this.AuthenticationService.isLoggedIn()){
      this.check_login();
    if(category === 'Delete Blog' || category === "Delete Forum"){
      const dialogRef = this.dialogue.open(ConfirmationComponent, {
        width: "500px",
        data: {type: "Delete",id:id,confirmation_line:'Are you sure you want to delete the Blog?',first_btn:'Yes',second_btn:'Cancle'}
      });
      return false;
    }
    else if(category === 'Update Blog'){
      this.router.navigate(["/text-editor"],{ queryParams: { id: id}});
    }
    else if(category === "Update Forum") {
      this.router.navigate(["/forum-detail"],{ queryParams: { id: id, edit: "true"}})
    }
    else if(category === 'Report Blog' || category === "Report Forum"){
      const dialogRef = this.dialogue.open(ReportSpamPopupComponent, {
        width: "500px",
        data: {type: "Blog",id:id}
      });
      return false
    }
    else if(category === 'Follow User'){
      this.NetworkService.follow_user(user_id._id).subscribe(
        data => {
          console.log(data);
        }
      )
      return true
    }
    else if(category === 'Unfollow User'){
      this.NetworkService.unfollow_user(user_id._id).subscribe(
        data => {
          console.log(data);
        }
      )
      return true
    }
  }
  else{
    const dialogRef = this.dialogue.open(SigninPopupComponent);
    return false
  }
  }
}
