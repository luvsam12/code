import { AuthenticationService } from './../../../shared/services/authentication.service';
import { PostActionsService } from './../../../shared/services/post-actions.service';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';
import {formatDate } from '@angular/common';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SigninPopupComponent } from 'src/app/popups/signin-popup/signin-popup.component';
import { CategoryService } from 'src/app/shared/services/category-list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { ReportSpamPopupComponent } from 'src/app/popups/report-spam-popup/report-spam-popup.component';
import { reduce } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AppConfig } from 'src/app/shared/services/app.config';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class BlogsComponent implements OnInit {
  blogList: any;
  commentList: any;
  currentDate ;
  blog_age: string;
  author_image_path: Array<string> = [];
  user_image;
  params;
  params_name;
  categoryList;
  num_of_followers;
  category_index;
  i:any;
  var:any;
  truth =true;
  isShow=false;
  cookie_id : any;
  bookmarkTruth = true;
  http: HttpClient;
  user_details: any = this.AuthenticationService.get_user_info();
  current_user_id = '';
  is_comment_available:Boolean =false;
  is_reply_available:Boolean =false;
  show_more_clicked:boolean = false;
  post_content_show_more:boolean = false;
  blog_options_category  = ['Follow User','Turn Off Notification','Report Blog'];
  filter = ['Popularity', 'Latest'];
  selected_filter = 'Popularity';
  IsFollowing = false;
  notEmptyBlog=true;
  nextBlogIds:Array<String>=[];
  routeDetails: any;
  routes: any;
  active: any;
  displayInterestImage:any=[];
  isLoggedIn=this.AuthenticationService.isLoggedIn();



  constructor(private blogService: BlogsListService,
              private AuthenticationService: AuthenticationService,
              public https: HttpClient,
              private router: Router,
              private activate_route: ActivatedRoute,
              private CategoryService: CategoryService,
              private dialogue: MatDialog,
              private postAction: PostActionsService,private spinner:NgxSpinnerService,private store: Store<AppState>,) {
                  

               }


  public ngAfterViewChecked(): void { }

           ngOnInit(): void {

             this.spinner.show();

          
                          this.CategoryService.getCategoriesData().subscribe(
            data =>
            { 
              this.categoryList = data;
             
            

            }
          )
    this.activate_route.queryParams.filter(params =>params.category).subscribe(params => {
      
      this.params = params.category;
      this.blogService.get_selected_category_blogs(this.params).subscribe(
        data => {
         
          this.blogList = data;
          // this.CategoryService.getCategoriesData().subscribe(
          //   data =>
          //   {
          //     this.categoryList = data;
             
          //     for(var i=0;i<this.categoryList.length;i++)
          //     {
          //       if(this.params === this.categoryList[i]._id){
          //         this.params_name = this.categoryList[i].name
          //         this.num_of_followers = this.categoryList[i].num_of_followers
          //         this.category_index = i;
          //       }
          //     }
          //   }
          // )
this.loadUserCurrentImage(data)

        }
      )
      })

    if(this.params === undefined)
    {
      if(this.isLoggedIn){
      this.getSelectedCategoryBlogsData();}
      else{
        this.blogService.getBlogsData().subscribe(
          data =>
          { console.log(data)
  this.loadUserCurrentImage(data["blogs"])
              // this.spinner.hide();
              this.blogList = data["blogs"];
              this.nextBlogIds=data["ids"];
              console.log(this.blogList)
              
          },
          (error) => {
            console.log(error);
          }
        )
      }
    };
    if(this.isLoggedIn){
    if(this.AuthenticationService.isLoggedIn()){
    this.AuthenticationService.getCurrentUserImage(this.user_details.authdata.user_id).subscribe(
      data =>
      {
        this.user_image = data.data.profile_image_path;
      }
    )
           }
          }

  }



      viewDone(id){
     
    this.blogService.put_views(id).subscribe(
      data =>{
        
      }
    )

  }

  // followingCheck(following){
  //   // console.log(following);
  //   for(var id of following){
  //     if(id === this.user_details.authdata.user_id){
  //       this.different_user_category = ['Unfollow User','Turn Off Notification','Report Blog'];

  //     }
  //     else{
  //       this.different_user_category = ['Follow User','Turn Off Notification','Report Blog']
  //     }
  //     return true;
  //   }
  // }



   getSelectedCategoryBlogsData()
  {  document.getElementById("blogalert").style.display="none"
      this.notEmptyBlog=true;
      this.blogList = []
      this.spinner.show()
          if(this.selected_filter === 'Popularity')
      { console.log("popularity is called ")
       console.log(this.categoryList)
                    this.blogService.getRecommendedBlogsData().subscribe(data =>{
                    
                  
                this.blogList=data["msg"];
            console.log(this.blogList[0])
                this.nextBlogIds=data["ids"];
this.loadUserCurrentImage(data["msg"])
                
            });
      }

      else{
        console.log("latest is called ")
      this.blogService.getBlogsData().subscribe(
        data =>
        { console.log(data)
this.loadUserCurrentImage(data["blogs"])
            // this.spinner.hide();
            this.blogList = data["blogs"];
            this.nextBlogIds=data["ids"];
            console.log(this.blogList)
            
        },
        (error) => {
          console.log(error);
        }
      )
      }
  }



onScroll(){
if(  this.notEmptyBlog && this.nextBlogIds.length !== 0 )
{ 
  this.spinner.show();

this.loadNextSetOfBlogs();

}

}

loadNextSetOfBlogs(){
  console.log(this.nextBlogIds)
  this.blogService.get_particular_blog(this.nextBlogIds).subscribe(data=>{
      this.spinner.hide();
  for (let i=0; i<data.length;i++)
  {
    this.blogList.push(data[i])

  }
this.loadUserCurrentImage(data)

  this.notEmptyBlog=false;
  if(  document.getElementById("blogalert")){
  document.getElementById("blogalert").style.display="block"
  }

}
)
}

loadUserCurrentImage(datas)
{
                for(let data of datas)
            {
              var id = data.user_id._id;
              this.AuthenticationService.getCurrentUserImage(id).subscribe(
                data => {
                  this.author_image_path.push(data.data.profile_image_path);
                }
              )
            }
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

      return publishedOn.slice(0,10);
  }

  unselect_category(){
    this.params = undefined
    // this.router.navigateByUrl("/courses")
    this.router.navigateByUrl("/blogs")
    this.blogService.getBlogsData().subscribe(
      data => {
this.loadUserCurrentImage(data)

        this.blogList = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  go_to_blog(id){
    this.router.navigate(["/show-blog"],{ queryParams: { id: id}});

  }

 Issame(author_id,followers){
   console.log(followers)
   var result = this.postAction.Issame(author_id);
   if(result){
    this.blog_options_category = ['Update Blog','Turn Off Notification','Delete Blog'];
     return true;
   }
   else if(!result){
    var check_following = false;
      for(var i=0;i<followers.length;i++){
        if(followers[i] === this.user_details.authdata.user_id){
          this.blog_options_category = ['Unfollow User','Turn Off Notification','Report Blog'];
          check_following = true;
        }
      }
      if(check_following === false){
        this.blog_options_category = ['Follow User','Turn Off Notification','Report Blog']
      }
   }
}

show_text(media,i){
  var content = ""
  content = document.getElementById("thread-desc-"+i).textContent
   document.getElementById("short-content-"+i).textContent = content
   
   if(media.length > 0){
    
   document.getElementById("short-content-first-media-"+i).innerHTML = media[0]
   
  // document.getElementById("short-content-first-media-"+i).parentNode.removeChild(document.getElementById("short-content-first-media-"+i).nextSibling)
   }
   else{

 
   }
   if(content.length >270){
    document.getElementById("post-content-show-more-"+i).style.display = "block"
    document.getElementById("post-content-show-more-"+i).style.position = "absolute"
    document.getElementById("post-content-show-more-"+i).style.marginLeft = "40%"
    document.getElementById("post-content-show-more-"+i).style.boxShadow = "-10px 0px 10px white"

  }
}

toDisplayInterestImage(media)
{
   if(media.length > 0){
    return false
   }
   else{
     return true
   }
}

go_to_profile(user_id){
  //this.router.navigateByUrl("/user-page")
  // console.log(user_id)
  this.router.navigate(["/user-page"],{ queryParams:{id:user_id._id}});
}

toGetInterestAttribute(blogCategoryId){

              for(var i=0;i<this.categoryList.length;i++)
              {
                  if(blogCategoryId === this.categoryList[i]._id){
                    
                    return this.categoryList[i].cssId
                }
              
              }

}
write_a_blog(){
  if(this.AuthenticationService.isLoggedIn())
  {
    this.router.navigateByUrl("/text-editor")
  }
else{
  const dialogRef = this.dialogue.open(SigninPopupComponent);
}

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

check_number_count(value){
  return this.postAction.check_number_count(value);
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
}
