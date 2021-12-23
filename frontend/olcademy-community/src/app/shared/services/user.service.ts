import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppConfig } from './app.config';
import { notification } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private http: HttpClient) { }

        get_user_notifications():Observable<notification>{
          let token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        'authorization': token
      }),
    }
        return this.http.get<notification>(`${AppConfig.GET_ALL_NOTIFICATIONS}`,requestOptions)
      }

      updateUserProfileImg(data){
           return this.http.put(`${AppConfig.PROFILE_IMG}`,data)
      }

}
