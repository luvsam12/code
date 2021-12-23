import { post_interest_myfeed } from './post-interest-myfeed.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from './app.config';
import { get_interest } from './get_interest.model';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  constructor(public http: HttpClient) { }
  get_experience(user_id){
    return this.http.get(`${AppConfig.GET_Experience}${user_id}`)
  }
  get_user_data(user_id):Observable<get_interest>{

    return this.http.get<get_interest>(`${AppConfig.GET_USER_DATA}${user_id}`)
  }
  post_experience(name,role,start,end):Observable<get_interest>{
    let data = {"company_name":name,"designation_title":role,"job_start_date":start,"job_end_date":end}
    return this.http.post<get_interest>(`${AppConfig.GET_Experience}`,data)
  }
  put_experience(name,role,start,end):Observable<get_interest>{
    let data = {"company_name":name,"designation_title":role,"job_start_date":start,"job_end_date":end}
    return this.http.put<get_interest>(`${AppConfig.GET_Experience}`,data)
  }
  delete_experience(id):Observable<get_interest>{
    // let data = {"company_name":name,"designation_title":role,"job_start_date":start,"job_end_date":end}
    return this.http.delete<get_interest>(`${AppConfig.GET_Experience}`+`${id}`)
  }


  get_education(user_id){
    return this.http.get(`${AppConfig.GET_EDUCATIION}${user_id}`)
  }
  post_education(name,role,start,end,grade):Observable<get_interest>{
    let data = {"institution_name":name,"degree_title":role,"degree_start_date":start,"degree_end_date":end,"degree_grade":grade}
    return this.http.post<get_interest>(`${AppConfig.GET_EDUCATIION}`,data)
  }
  put_education(name,role,start,end,grade):Observable<get_interest>{
    let data = {"institution_name":name,"degree_title":role,"degree_start_date":start,"degree_end_date":end,"degree_grade":grade}
    return this.http.put<get_interest>(`${AppConfig.GET_EDUCATIION}`,data)
  }
  delete_education(id):Observable<get_interest>{
    // let data = {"institution_name":name,"degree_title":role,"degree_start_date":start,"degree_end_date":end,"degree_grade":grade}
    return this.http.delete<get_interest>(`${AppConfig.GET_EDUCATIION}`+`${id}`)
  }


  get_research(user_id){
    return this.http.get(`${AppConfig.GET_RESEARCH}${user_id}`)
  }
  post_research(name,start):Observable<get_interest>{
    let data = {"research_topic":name,"publication_date":start}
    return this.http.post<get_interest>(`${AppConfig.GET_RESEARCH}`,data)
  }
  put_research(name,start):Observable<get_interest>{
    let data = {"research_topic":name,"publication_date":start}
    return this.http.put<get_interest>(`${AppConfig.GET_RESEARCH}`,data)
  }
  delete_research(id):Observable<get_interest>{
    // let data = {"research_topic":name,"publication_date":start}
    return this.http.delete<get_interest>(`${AppConfig.GET_RESEARCH}`+`${id}`)
  }


  get_certifications(user_id){
    return this.http.get(`${AppConfig.GET_CERTIFICATE}${user_id}`)
  }
  post_certification(name,type,start):Observable<get_interest>{
    let data = {"certifying_firm":name,'name_of_certification':type,"date_of_completion":start}
    return this.http.post<get_interest>(`${AppConfig.GET_CERTIFICATE}`,data)
  }
  put_certification(name,type,start):Observable<get_interest>{
    let data = {"certifying_firm":name,'name_of_certification':type,"date_of_completion":start}
    return this.http.put<get_interest>(`${AppConfig.GET_CERTIFICATE}`,data)
  }
  delete_certification(id):Observable<get_interest>{
    // let data = {"certifying_firm":name,'name_of_certification':type,"date_of_completion":start}
    return this.http.delete<get_interest>(`${AppConfig.GET_CERTIFICATE}`+`${id}`)
  }

  get_social(user_id){
    return this.http.get(`${AppConfig.GET_SOCIAL}${user_id}`)
  }
  post_social(name,type,start):Observable<get_interest>{
    let data = {"website":name,'username':type,"link":start}
    return this.http.post<get_interest>(`${AppConfig.GET_SOCIAL}`,data)
  }
  put_social(name,type,start):Observable<get_interest>{
    let data = {"website":name,'username':type,"link":start}
    return this.http.put<get_interest>(`${AppConfig.GET_SOCIAL}`,data)
  }
  delete_social(id):Observable<get_interest>{
    // let data = {"website":name,'username':type,"link":start}
    return this.http.delete<get_interest>(`${AppConfig.GET_SOCIAL}`+`${id}`)
  }


  get_skills(user_id){
    return this.http.get(`${AppConfig.GET_SKILLS}${user_id}`)
  }
  post_skills(name){
    let data = {'user_skill':name,'user_skill_rating':"6"}
    return this.http.post(`${AppConfig.GET_SKILLS}`,data)
  }
  delete_skills(id){
    // let data = {'user_skill':name,'user_skill_rating':"6"}
    return this.http.delete(`${AppConfig.GET_SKILLS}`+`${id}`)
  }
  delete_interest(id){
    // let data = {'user_skill':name,'user_skill_rating':"6"}
    return this.http.delete(`${AppConfig.GET_SAVED_INTEREST}`+`${id}`)
  }
  get_interest(){
    // let data = {'user_skill':name,'user_skill_rating':"6"}
    return this.http.get(`${AppConfig.GET_SAVED_INTEREST}`)
  }

  post_interest_myfeed(array):Observable<post_interest_myfeed>{
    let data = {"interest": array};
    return this.http.post<post_interest_myfeed>(`${AppConfig.POST_INTEREST_MY_FEED}`+`${array}`,data)
  }
  delete_interest_myfeed(array):Observable<post_interest_myfeed>{
    return this.http.delete<post_interest_myfeed>(`${AppConfig.POST_INTEREST_MY_FEED}`+`${array}`)
  }

  put_user_data(name,tag):Observable<get_interest>{
    let data = {'full_name':name,'about_user':tag} //,'date_of_birth':dob,'user_country':country,'user_address':address,'user_bio':bio
    return this.http.put<get_interest>(`${AppConfig.PUT_USER_DATA_F}`,data)
  }
  put_user_data2(dob,country,address,bio):Observable<get_interest>{
    let data = {'date_of_birth':dob,'user_country':country,'user_address':address,'user_bio':bio}
    return this.http.put<get_interest>(`${AppConfig.PUT_USER_DATA_S}`,data)
  }

  post_interest(id){
    // let data = {'user_skill':name,'user_skill_rating':"6"}
    return this.http.post(`${AppConfig.GET_SAVED_INTEREST}`+`${id}`,id)
  }

}
