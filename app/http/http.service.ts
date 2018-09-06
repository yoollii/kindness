import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class HttpService {
  // public url = 'http://192.168.1.252:8099';
  public url = 'http://hjj.ngrok.michaelch.xyz';
  // public url = 'http://192.168.1.250:8080/pc/';
  constructor(public http: Http) {
  }
  // 登录接口不传令牌post
  httpmenderlogin(funName: string, data: any) {
//  const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});//form data
    const headers = new Headers({'Content-Type': 'text/plain;charset=UTF-8'}); // request payload
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + funName, data, options).pipe(map(res => res.json()));
  }

  // 接口必须传令牌post
  httpmender(funName: string, data: any) {
    const headers1 = new Headers();
    headers1.append('Content-Type', 'application/json');
    // headers1.append('Authorization', authorization);
    const options1 = new RequestOptions({ headers: headers1 });
    return this.http.post(this.url + funName, data, options1).pipe(map(res => res.json()));
  }
  // get请求
  httpmenderget(funName: string) {
    const headers2 = new Headers();
    headers2.append('Content-Type', 'application/json;charset=UTF-8');
    headers2.append('Access-Control-Allow-Origin', '*');
    const options2 = new RequestOptions({ headers: headers2 });
    return this.http.get(this.url + funName, options2).pipe(map(res => res.json()));
  }
  httphjjget(funName: string) {
    const headers2 = new Headers();
    // headers2.append('Content-Type', 'application/json;charset=UTF-8');
    headers2.append('Access-Control-Allow-Origin', '*');
    const options2 = new RequestOptions({ headers: headers2 });
    return this.http.get(this.url + funName, options2).pipe(map(res => res));
  }
  // get请求
  httpweatherget(funName: string) {
    const headers2 = new Headers();
    headers2.append('Content-Type', 'application/json;charset=UTF-8');
    const options2 = new RequestOptions({ headers: headers2 });
    return this.http.get(funName, options2).pipe(map(res => res.json()));
  }
   // put请求
  httpmenderput(funName: string, data: any) {
    const headers2 = new Headers();
    headers2.append('Content-Type', 'application/json');
    // headers2.append('Authorization', authorization);
    const options2 = new RequestOptions({ headers: headers2 });
    return this.http.put(this.url + funName, data, options2).pipe(map(res => res.json()));
  }

  // delete请求
  httpmenderdel(funName: string) {
    const headers2 = new Headers();
    headers2.append('Content-Type', 'text/plain;charset=UTF-8');
    const options2 = new RequestOptions({ headers: headers2 });
    return this.http.delete(this.url + funName, options2).pipe(map(res => res.json()));
  }
}

export const uploadurl = 'http://192.168.1.250:8080/';
export const weartherurl = 'http://tj.nineton.cn/Heart/index/all?city=';
export const imgUrl = 'http://192.168.1.250:8080/attachment/download/';
