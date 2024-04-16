import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const getTkn = window.sessionStorage.getItem('token');
@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private httpClient: HttpClient) { }
  

  get(endpoint: string){
    let headers = new HttpHeaders()
    .set('Authorization','');
    if(getTkn){
      headers = headers.set('Authorization', 'Bearer '+ getTkn);
    }
  

    return this.httpClient.get('https://api.github.com/' + endpoint, {headers});
  }
}
