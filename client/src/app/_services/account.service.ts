import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "../_models/user";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {//singleton
  baseUrl = "https://localhost:5001/api/";
  private currentUserSource = new ReplaySubject<User>(1);//一つしか値持たないストリーム
  currentUser$ = this.currentUserSource.asObservable();
  //$の意味はオブザーバぼーであるということ
  //ストリームにする意味とは？
  constructor(private http: HttpClient) { }

  /*
  obserbableの意味
  obserbableはangularで非同期処理を行うためのもの。
  Promise:処理先から一度にデータが送られてくる
  Obserbable:処理先からデータがストリームされる
  ストリームを受け取る相手がいないとストリームされない(subscribe関数を用いる)
  例https://www.youtube.com/watch?v=V4iMyVnQPqM

  pipeはストリームを加工するときに用いる。（オペレーターの過程）
　Map:変数を途中で加工する
  Filter:変数を条件式で処理する
   */

  login(model :any){
    return this.http.post(this.baseUrl + "account/login", model).pipe(
      map((Response: User) => {//User型のResponseを引数に
        const user = Response;
        if(user){//null判定（ユーザーがいるかどうか）
          localStorage.setItem('user', JSON.stringify('user'));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model:any){
    return this.http.post(this.baseUrl + "account/register", model).pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify('user'));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
