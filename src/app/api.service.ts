import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable, of, } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({ 'content': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  endpoint = environment.apiHost;
  user_id: string;
  token: string;
  lang: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.token = this.cookieService.get('user_token')
    this.lang = this.cookieService.get('lang')


  }


  count_data(date_from, date_to): Observable<any> {

    return this.http.get(this.endpoint + 'count_data?date_from=' + date_from + '&date_to=' + date_to);
  }


  
  login(body): Observable<any> {
    return this.http.post(this.endpoint + 'admin_login', body)
  }

  
  show_trainer(): Observable<any> {
    this.lang = this.cookieService.get('lang')

    return this.http.get(this.endpoint + 'show_trainer?user_token=' + this.token +'&lang=' + this.lang);
  }

  show_blockedtrainer(): Observable<any> {
    this.lang = this.cookieService.get('lang')

    return this.http.get(this.endpoint + 'show_blockedtrainer?user_token=' + this.token +'&lang=' + this.lang);
  }

  show_PreviousDealings(id): Observable<any> {
    return this.http.get(this.endpoint + 'show_PreviousDealings?user_token=' + this.token + '&id=' + id);
  }

  update_commission(formValue): Observable<any> {

    console.log(formValue)
    const formData: FormData = new FormData();

    formData.append('user_token', this.token);
    formData.append('comission', formValue['comission']);
    formData.append('id', formValue['user_id']);
    return this.http.post(this.endpoint + 'update_commission', formData)
  }

  recharge_wallet(formValue): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('user_token', this.token);
    formData.append('user_id', formValue['user_id']);
    formData.append('cash', formValue['cash']);

    return this.http.post(this.endpoint + 'recharge_wallet', formData)
  }
  block_user(id): Observable<any> {
    this.lang = this.cookieService.get('lang')

    return this.http.get(this.endpoint + 'block_user?user_token=' + this.token + '&user_id=' + id +'&lang=' + this.lang);
  }

  unblock_user(id): Observable<any> {
    this.lang = this.cookieService.get('lang')

    return this.http.get(this.endpoint + 'unblock_user?user_token=' + this.token + '&user_id=' + id +'&lang=' + this.lang);
  }



}
