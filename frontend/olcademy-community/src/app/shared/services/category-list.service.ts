import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from './app.config';
import { CategoryData } from './category-data.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public http: HttpClient) { }

  //get categories list
  getCategoriesData(): Observable<CategoryData[]> {

    const requestOptions = {
      headers: new HttpHeaders({
        'Anonymous': 'Anonymous'
      }),
    };

    return this.http.get<CategoryData[]>(`${AppConfig.CATEGORY_LIST_URL}`, requestOptions);
    // json url to be given for getting the json
  } 

  getTestCategoriesData(): Observable<CategoryData[]> {

    const requestOptions = {
      headers: new HttpHeaders({
        'Anonymous': 'Anonymous'
      }),
    };

    return this.http.get<CategoryData[]>(`${AppConfig.TEST_LIST_URL}`, requestOptions);
    // json url to be given for getting the json
  } 

}
