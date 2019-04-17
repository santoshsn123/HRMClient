import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TimingsService } from "../services/timings/timings.service";

@Component({
  selector: "app-punching",
  templateUrl: "./punching.component.html",
  styleUrls: ["./punching.component.scss"]
})
export class PunchingComponent implements OnInit {
  getCurrentTime;
  currentUser;
  punchInStat: boolean = false;
  punchOutStat: boolean = false;
  status;
  UserId;
  @Output() valueChange = new EventEmitter();
  constructor(private timings: TimingsService) {
    setInterval(() => {
      const today = new Date();
      this.getCurrentTime = this.formateTime(today);
    }, 1);
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.UserId = this.currentUser.userId;
    this.getPunchStat();
  }

  getPunchStat = () => {
    this.timings.getPunchStat(this.currentUser.userId).subscribe(data => {
      console.log(data);
      this.status = data;
      this.punchInStat = this.status.punchin;
      this.punchOutStat = this.status.punchout;
    });
  };
  punchIn = () => {
    this.valueChange.emit(this.currentUser.userId);
    this.timings.punchIn(this.currentUser.userId).subscribe(data => {
      this.getPunchStat();
    });
  };

  punchOut = () => {
    this.valueChange.emit(this.currentUser.userId);
    this.timings.punchOut(this.currentUser.userId).subscribe(data => {
      this.getPunchStat();
    });
  };

  formateTime = time => {
    let tm = new Date(time);
    let minutes =
      tm.getMinutes() < 10 ? "0" + tm.getMinutes() : tm.getMinutes();
    let seconds =
      tm.getSeconds() < 10 ? "0" + tm.getSeconds() : tm.getSeconds();
    return tm.getHours() + ":" + minutes + ":" + seconds;
  };
}
