import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-calender-for-app",
  templateUrl: "./calender-for-app.component.html",
  styleUrls: ["./calender-for-app.component.scss"]
})
export class CalenderForAppComponent implements OnInit {
  userId;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => (this.userId = params.userId));
  }

  ngOnInit() {}
}
