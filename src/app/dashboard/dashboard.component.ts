import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "../services/transactions/transactions.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private transaction: TransactionsService,
    private router: Router
  ) {}

  UserId;
  currentUser;
  userType;
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    if (!this.currentUser) {
      this.router.navigate(["login"]);
    } else {
      this.UserId = this.currentUser.userId;
      this.userType = this.currentUser.userType;
    }
  }
}
