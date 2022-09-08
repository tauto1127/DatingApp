import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./_models/user";
import {AccountService} from "./_services/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Dating App';
  users: any;

  constructor(private accountService: AccountService) {

  }

  ngOnInit() {//一番最初に実行される
    //this.getUsers();
    this.setCurrentUser();//最初にログインしておくため
  }

  setCurrentUser(){
    const user:User = JSON.parse(localStorage.getItem('user'));//parseでjsonをオブジェクトに変換
    this.accountService.setCurrentUser(user);
  }

  /*
  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe(response =>{
      this.users = response;
    }, error => {
      console.log(error);
    })
  }*/
}
