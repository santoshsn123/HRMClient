import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "cashless-admin";
  showSideBar: boolean = true;
  constructor(private router: Router, private userstate: DataService) {}

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    // console.log(currentUser);
    this.userstate.getLoginState().subscribe(state => {
      this.showSideBar = state.login;
    });
    this.showSideBar = currentUser ? true : false;
  }
}
