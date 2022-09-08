import { Component, OnInit } from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Observable} from "rxjs";
import {User} from "../_models/user";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  //loggedin: boolean;

  constructor(public accountService : AccountService) { }//

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(Response =>{
      console.log(Response)
      //this.loggedin = true;
    }, error => {
      console.log(error);
      }

    )
  }

  logout()
  {
    this.accountService.logout();
    //this.loggedin = false;
  }

  /*ユーザーの存在確認
  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user => {
      this.loggedin = !!user;//ユーザーが存在するか（null判定）
    }, error => {
      console.log(error);
    })*/
  //}
}
