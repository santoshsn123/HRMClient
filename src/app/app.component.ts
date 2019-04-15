import { Component } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "cashless-admin";
  showSideBar: boolean = true;
  constructor(private router: Router, private userstate: DataService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log(event.url);
        let currentUser = JSON.parse(localStorage.getItem("user"));
        if (
          event.url !== "/login" &&
          event.url !== "/forgetPassword" &&
          !currentUser &&
          event.url.split("/")[1] !== "empRegisterLink" &&
          event.url.split("/")[1] !== "forgetPassword" &&
          event.url.split("/")[1] !== "calenderForApp"
        ) {
          console.log("in If condition ");
          this.router.navigate(["login"]);
        } else {
          console.log("in else condition ");
        }
        this.showSideBar = event.url.split("/")[1] !== "calenderForApp";
        if (event.url == "/login" && currentUser) {
          this.router.navigate(["dashboard"]);
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    this.userstate.getLoginState().subscribe(state => {
      this.showSideBar = state.login;
    });
    this.showSideBar = currentUser ? true : false;
  }
}
