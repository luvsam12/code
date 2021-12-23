import { AppConfig } from 'src/app/shared/services/app.config';
import { Observable } from 'rxjs';
import { networkData } from './network.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private Http: HttpClient) { }

  get_connections(): Observable<networkData>{
    return this.Http.get<networkData>(`${AppConfig.GET_CONNECTIONS}`)
  }

  get_pending_request(): Observable<networkData>{
    return this.Http.get<networkData>(`${AppConfig.PENDING_REQUEST}`)
  }

  get_sent_request(): Observable<networkData>{
    return this.Http.get<networkData>(`${AppConfig.SENT_REQUEST}`)
  }

  get_suggestion(): Observable<networkData>{
    return this.Http.get<networkData>(`${AppConfig.SUGGESTIONS}`)
  }

  follow_user(id){
    let data ={}
    return this.Http.post(`${AppConfig.FOLLOW_USER}`+ id, data)
  }

  unfollow_user(id){
    return this.Http.delete(`${AppConfig.UNFOLLOW_USER}`+ id)
  }

  accept_connect_request(to_user,from_user){
    let data = {
      from_user: from_user,
      to_user: to_user
    }
    return this.Http.post(`${AppConfig.ACCEPT_CONNECT_REQUEST}`,data);
  }

  reject_connection_request(from_user,to_user){
    let data = {
      from_user: from_user,
      to_user: to_user
    }
    return this.Http.put(`${AppConfig.REJECT_CONNECTION_REQUEST}`,data);
  }

  remove_user(from_user,to_user){
    let data ={
      from_user : from_user,
      to_user : to_user
    }
    return this.Http.put(`${AppConfig.REMOVE_CONNECTION}`,data);
  }

  send_connection_request(from_user,to_user){
    let data = {
      from_user: from_user, 
      to_user: to_user
    }
    return this.Http.post(`${AppConfig.SEND_CONNECTION_REQUEST}`, data)
  }
}
