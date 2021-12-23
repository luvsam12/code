import { BlogsData } from './blogs_data.model';
import {CommentsData} from './comments_data.model'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from './app.config';
import { Router, Params } from '@angular/router';
import {post_kudos} from 'src/app/shared/services/post_kudos.model';
import {post_report} from 'src/app/shared/services/post_report.model';


@Injectable({
  providedIn: 'root'
})
export class BlogsListService {
 
  constructor(public http: HttpClient,
              private router: Router) { }

  getBlogsData(): Observable<BlogsData[]>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Anonymous': 'Anonymous'
      }),
    }
    return this.http.get<BlogsData[]>(`${AppConfig.GET_BLOGS_URL}`,requestOptions);

  }

getRecommendedBlogsData(): Observable<BlogsData[]>{
  let token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        'authorization': token
      }),
    }
    return this.http.get<BlogsData[]>(`${AppConfig.GET_NEXT_SET_BLOGS_URL}`,requestOptions);
}





  getForumsData(): Observable<BlogsData[]>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Anonymous': 'Anonymous'
      }),
    }
    return this.http.get<BlogsData[]>(`${AppConfig.GET_FORUMS}`,requestOptions);

  }
  getCommentsData(id:any): Observable<CommentsData[]>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Anonymous': 'Anonymous'
      }),
    };
    return this.http.get<CommentsData[]>(`${AppConfig.GET_COMMENT}`+`${id}`,requestOptions);
  }

  getReplyData(id): Observable<CommentsData[]>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Anonymous': 'Anonymous'
      }),
    }
    return this.http.get<CommentsData[]>(`${AppConfig.GET_REPLY}`+`${id}`,requestOptions);
  }

  get_selected_category_blogs(category):Observable<BlogsData[]>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Anonymous': 'Anonymous'
      }),
    }
    return this.http.get<BlogsData[]>(`${AppConfig.GET_SELECTED_CATEGORY_BLOGS}`+category+"/posts", requestOptions);
  }

  get_particular_blog(ids):Observable<BlogsData[]>{
    console.log(ids)
        const data={ids:ids}; 
    const requestOptions = {
      headers: new HttpHeaders({
        'Anonymous': 'Anonymous'
      }),
    }
    return this.http.post<BlogsData[]>(`${AppConfig.GET_PARTICULAR_POST}`,data,requestOptions)
  }

  get_user_bookmarkes(){
    return this.http.get<BlogsData[]>(`${AppConfig.GET_USER_BOOKMARKED}`);
  }


  get_user_blogs(){
   return this.http.get<BlogsData[]>(`${AppConfig.GET_USER_POST}`);
  }

  post_blog(formData):Observable<BlogsData[]>{
    return this.http.post<BlogsData[]>(`${AppConfig.PUBLISH_POST}`,formData);
  }

  post_comment(id,comment,author_name):Observable<CommentsData>{
    let data = {"author_name":author_name,"comment":comment}
    return this.http.post<CommentsData>(`${AppConfig.POST_COMMENT}`+`${id}`,data)
  }

  post_reply(id,comment,post_id,author_name):Observable<CommentsData>{
    let data = {"author_name":author_name,"parent_comment_id":id,"comment":comment}
    return this.http.post<CommentsData>(`${AppConfig.POST_REPLY}`+`${post_id}`,data)
  }

  post_likes(post): Observable<post_kudos> {
    let data = {"like_type":"Post","like_id": post}
    return this.http.post<post_kudos>(`${AppConfig.INCREASE_LIKES}`, data)  //+`${post}`

  }

  post_likes_comment(post): Observable<post_kudos> {
    let data = {"like_type":"comment","like_id": post}
    return this.http.post<post_kudos>(`${AppConfig.INCREASE_LIKES}`, data)  //+`${post}`

  }


  post_report(id,type,comment): Observable<post_report> {

    let data = {"post_id": id,"report_type":type,"additional_comment":comment}
    return this.http.post<post_report>(`${AppConfig.POST_REPORT}`, data)

  }

  comment_report(id,comment_id,type,comment): Observable<post_report> {

    let data = {"post_id": id,"comment_id":comment_id,"report_type":type,"additional_comment":comment}
    return this.http.post<post_report>(`${AppConfig.REPORT_COMMENT}`, data)

  }
  reply_report(id,comment_id,type,comment): Observable<post_report> {

    let data = {"post_id": id,"reply_comment_id":comment_id,"report_type":type,"additional_comment":comment}
    return this.http.post<post_report>(`${AppConfig.REPORT_REPLY}`, data)

  }

  put_views(post){
    let data = post;
    return this.http.put<any>(`${AppConfig.INCREASE_VIEWS}`+`${post}`,data)
  }

  post_bookmark(user,post): Observable<post_kudos> {

    let data = {"user_id": user}
    return this.http.post<post_kudos>(`${AppConfig.INCREASE_BOOKMARK}`+`${post}`, data)

  }
  delete_bookmark(post): Observable<post_kudos> {

    return this.http.delete<post_kudos>(`${AppConfig.INCREASE_BOOKMARK}`+`${post}`)

  }

  delete_blog(id){
    return this.http.delete(`${AppConfig.DELETE_POST}`+`${id}`)
  }

  update_blog(id,formData){
    return this.http.put(`${AppConfig.UPDATE_POST}`+`${id}`,formData)
  }

  delete_kudos(post) {
    let data ={"like_type": "Post","like_id":post}
    return this.http.put(`${AppConfig.DELETE_LIKES}`,data)
  }
  delete_kudos_c(post) {
    let data ={"like_type": "Comment","like_id":post}
    return this.http.put(`${AppConfig.DELETE_LIKES}`,data)
  }

}
