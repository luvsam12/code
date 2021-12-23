import { Router } from '@angular/router';
import { get_interest } from './get_interest.model';
import {notification} from './notification.model'
import { show_popup } from './show-popup.model';
import { post_interest } from './post-interest.model';
import { profile_details } from './profile_image.model';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { AppConfig } from './app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDetails } from './login-details.model';
import {post_report} from './post_report.model'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private router: Router) { }


      // get the user data based on cookie id.
      // auth_login(cookie_id): Observable<LoginDetails> {

      //   const requestOptions = {
      //       headers: new HttpHeaders({
      //         'Anonymous': 'Anonymous'
      //       }),
      //     };

      //   return this.http.get<LoginDetails>(`${AppConfig.LOGIN_DETAILS}`+`${cookie_id}`, requestOptions);
      // }

      // register(formdata){
      //   const requestOptions = {
      //     headers: new HttpHeaders({
      //       'Anonymous': 'Anonymous'
      //     }),
      //   };
      //   return this.http.post(`${AppConfig.REGISTER_USER}`,formdata,requestOptions)
      // }

      register(name,email,password){
        const requestOptions = {
          headers: new HttpHeaders({
            'Anonymous': 'Anonymous'
          }),
        };
        var data = {
          "full_name": name,
          'user_email_id': email,
          'password':password
        }
        return this.http.post(`${AppConfig.REGISTER_USER}`,data,requestOptions)
      }

      forgotPassword(email): Observable<post_report>{
        const requestOptions = {
          headers: new HttpHeaders({
            'Anonymous': 'Anonymous'
          }),
        };
          const data={
            "email": email
          }
          // console.log("Random statement...");
          return this.http.post<post_report>(`${AppConfig.FORGOT_PASSWORD}`,data,requestOptions);
        }
    
      
      login(email,password): Observable<LoginDetails>{
        const requestOptions = {
          headers: new HttpHeaders({
            'Anonymous': 'Anonymous'
          }),
          
        };
        var data = {
          'user_email_id': email,
          'password':password
        }
        return this.http.post<LoginDetails>(`${AppConfig.LOGIN}`,data,requestOptions)
      }

      logout() {
        localStorage.removeItem('token');
        this.router.navigateByUrl("/courses")
      }

      google_login(){
        const requestOptions = {
          headers: new HttpHeaders({
            'Anonymous': 'Anonymous'
          }),
        };
        return this.http.get(`${AppConfig.GOOGLE_LOGIN}`,requestOptions)
      }



      /**Check Whether currently i am loged in or not */
      isLoggedIn() {
        // const helper = new JwtHelperService();
        let token = localStorage.getItem('token');
        let total_object = JSON.parse(token);
        if(!total_object){
          return false
        }
        else{
          return true;
        }
        // const isExpired = helper.isTokenExpired(token);              // will use this when we will change the expire time of the token
        // return !isExpired;
      }


      /**Fetch Current Data of User by decoding token */

      get_user_info(){
        if(localStorage.getItem('token'))
        {


        const helper = new JwtHelperService();
        let token = localStorage.getItem('token');
        let total_object = JSON.parse(token);
        let error = "error"
        if(!total_object.loginSuccess){
          return error
        }
        else{
          return total_object;
          


          
        }
      }
    }


    //register user



      //to get the user image.

        getCurrentUserImage(user_id): Observable<profile_details>{
          const requestOptions = {
            headers: new HttpHeaders({
              'Anonymous': 'Anonymous'
            }),
          }

        return this.http.get<profile_details>(`${AppConfig.USER_IMAGE}`+`${user_id}`, requestOptions)
      }


      // to check wrt token weather to show the popup or not.
      check_popup(): Observable<show_popup>{
        return this.http.get<show_popup>(`${AppConfig.SHOW_POPUP_GET}`)
      }

      //to post the interest selected by the user.
      post_interest(array): Observable<post_interest> {
        let data = {"interest": array}
        return this.http.post<post_interest>(`${AppConfig.POST_INTERST_PATH}`, data)

      }


      // to get the interest selected by the user.
      get_interest(): Observable<get_interest> {
        return this.http.get<get_interest>(`${AppConfig.GET_SAVED_INTEREST}`)
      }


}
