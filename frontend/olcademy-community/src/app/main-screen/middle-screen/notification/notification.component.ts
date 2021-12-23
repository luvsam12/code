import { Component, OnInit } from '@angular/core';
import { InterestService } from 'src/app/shared/services/interest.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';
import { not } from '@angular/compiler/src/output/output_ast';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private AuthenticationService: AuthenticationService, 
    private UserService: UserService,
    private interestService:InterestService, 
    private blogService: BlogsListService,
    private router: Router,) { }

  notification_array:any=[];
  author_image_path: Array<string> = [];
    userDetails:any;

  ngOnInit(): void {

this.UserService.get_user_notifications().subscribe(data =>{
  for(let notification of data["data"]){
    // console.log(notification)
this.notification_array.push(notification)
            var id = notification.user_id;
            this.AuthenticationService.getCurrentUserImage(id).subscribe(
              data => {
                this. author_image_path.push(data.data.profile_image_path)
              }
            )
                                          this.interestService.get_user_data(id).subscribe(
      data=>{

        this.userDetails=data;
      }
                              )

  }
})

  }

  isShow:boolean = false;
  isShow_not:boolean = false;
  isShow_book:boolean = false;
  isShow_user:boolean = false;



  
  toggleDisplay(vari:string){
    if(!this.isShow){
    document.getElementById(vari).style.display = "block" ;
    document.getElementById(vari).style.opacity = "1" ;
    document.getElementById(vari).style.visibility = "visible" ;
    this.isShow = true;
    }
    else{
      document.getElementById(vari).style.display = "none" ;
      document.getElementById(vari).style.opacity = "0" ;
      document.getElementById(vari).style.visibility = "hidden" ;
      this.isShow = false;
      }
  }

  Bookmark(varia:string){ 
    if(!this.isShow_book){
      document.getElementById(varia).innerHTML = 'Remove Bookmark';
      this.isShow_book=true;
    }
    else{
      document.getElementById(varia).innerHTML = 'Bookmark this Post';
      this.isShow_book=false;
    }
  }

  Notify(varia:string){ 
  if(!this.isShow_not){
    document.getElementById(varia).innerText = 'Turn On Notification';
    this.isShow_not=true;
  }
  else{
    document.getElementById(varia).innerText = 'Turn Off Notification';
    this.isShow_not=false;
  }
}

Follow(varia:string){ 
  if(!this.isShow_user){
    document.getElementById(varia).innerHTML = 'Follow User';
    this.isShow_user=true;
  }
  else{
    document.getElementById(varia).innerHTML = 'Unfollow User';
    this.isShow_user=false;
  }
}

Remove(varia:string)
{
    document.getElementById(varia).style.display = "none" ;
    document.getElementById(varia).style.opacity = "0" ;
    document.getElementById(varia).style.visibility = "hidden" ;
}

notificationBackground(){
if(this.userDetails)
{

       
       for(let i=0; i<this.userDetails.userData["notification"].length;i++)
       {
         if(this.userDetails.userData["notification"][i]["isRead"] == false)
         { return "unreaad-card"
         }
       }
}

}

go_to_link(id){
  // console.log("This is notification: ", id)
  var notif;
  for(let i=0; i< this.notification_array.length; i++){
    if(this.notification_array[i]._id===id){
      notif=this.notification_array[i];
    }
  }
  console.log(notif)
  var type;
  console.log(notif.notification_user_type);
  if(!notif.notification_user_type.includes("post")){
    type="user"
    // this.router.navigate(["/user-page"],{ queryParams:{id:id}});
  }
  else{
    this.blogService.getForumsData().subscribe(
      data =>
      { 
        for(let i=0; i<data.length; i++){
          console.log(data[i]._id,"hellos")
          if(data[i]._id===notif.post_id){
            console.log("forummmmm")
            type="forum"
            this.router.navigate(["/forum-detail"],{ queryParams: { id: notif.post_id, edit: "false"}});
            break
          }
        }
        if(type!="forum" && type!="user"){
          this.router.navigate(["/show-blog"],{ queryParams: { id: notif.post_id}});
        }

      },
      (error) => {
        console.log(error);
      }
    )

  }
 
}


}




