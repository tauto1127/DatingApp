import { Component, OnInit } from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Observable} from "rxjs";
import {User} from "../_models/user";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  //loggedin: boolean;

  constructor(public accountService : AccountService, private router:Router,
  private toastr: ToastrService) { }//

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      this.toastr.success("hello", "hello");
      this.toastr.success("welcome " + user.username);
    })
  }

  login(){
    this.accountService.login(this.model).subscribe(Response =>{
      console.log(Response)
      this.router.navigateByUrl('/members');
      //this.loggedin = true;
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
      }

    )
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl("/");
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
