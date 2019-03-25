import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

import { Store } from "@ngrx/store";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class DataService {
  dataString: string;
  // baseUrl: string = "http://localhost:9999/api";
  baseUrl: string = "https://hrmearts.herokuapp.com/api";
  // baseUrl: string = "http://54.245.154.250:3000/api";
  constructor(
    private http: HttpClient,
    private store: Store<any>,
    private router: Router
  ) {}
  // getUsers() {
  //   return this.http.get('https://jsonplaceholder.typicode.com/users')
  // }
  // getUser(userId) {
  //   return this.http.get('https://jsonplaceholder.typicode.com/users/' + userId)
  // }

  // getPosts() {
  //   return this.http.get('https://jsonplaceholder.typicode.com/posts')
  // }
  getLoginState() {
    return this.store.select("appReducer");
  }

  setPageasLogin(obj) {
    this.store.dispatch({ type: obj.action, payload: {} });
  }

  setLoginDetails(obj) {
    this.store.dispatch({ type: obj.action, payload: obj.user });
  }
  checkAuthentication = error => {
    if (error.error.message == "Authentication Failed.Invalid Token.") {
      localStorage.clear();
      this.router.navigate(["login"]);
    }
  };
}
