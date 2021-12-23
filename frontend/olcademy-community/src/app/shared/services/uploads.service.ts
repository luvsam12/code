import { uploads } from './upload.model';
import { AppConfig } from './app.config';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  constructor(private http: HttpClient) { }

  image_upload(files):Observable<uploads>{
    // let data = {media: files}
    return this.http.post<uploads>(`${AppConfig.IMAGES_UPLOADS}`,files);
  }

  video_upload(files):Observable<uploads>{
    // let data = {media: files}
    return this.http.post<uploads>(`${AppConfig.VIDEOS_UPLOADS}`,files);
  }

  document_upload(files):Observable<uploads>{
    // let data = {media: files}
    console.log(files)
    return this.http.post<uploads>(`${AppConfig.DOCUMENT_UPLOADS}`,files);
  }
  register_user(data){
    return this.http.post(`${AppConfig.REGISTER_USER}`,data);
   }
}
