import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { ACTION_LOGOUT, ACTION_LOGIN } from "../store/actions/appActions";
import { UsersService } from "../services/users/users.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  username: string = "";
  user;
  userdetails;
  currentUser;
  constructor(
    private router: Router,
    private data: DataService,
    private userData: UsersService
  ) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user && router.url != "/login") {
      this.router.navigate(["login"]);
    }

    if (user && router.url == "/login") {
      this.router.navigate([""]);
    }

    // this.username = localStorage.getItem("user"); // Check if the Username saved in localstorage

    //If Not available in localstorage get username from the api call.
    let uuid = this.user ? this.user.uuid : "";
    if (!this.username) {
      // this.userData.getSingleUser(uuid).subscribe(data => {
      //   this.userdetails = data;
      //   this.username =
      //     this.userdetails.user.firstName +
      //     " " +
      //     this.userdetails.user.lastName;
      //   localStorage.setItem("username", this.username);
      // });
    }
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
  }

  logout() {
    localStorage.clear();
    console.log(JSON.parse(localStorage.getItem("user")));
    this.router.navigate(["login"]);
  }
}

// function sidebar_toggle($event){

// 	var element = document.getElementById("sidebar-collapse");
//   element.classList.toggle("sidebar_collapsed");
// }
