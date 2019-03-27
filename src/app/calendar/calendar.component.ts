import { Component, OnInit, Input } from "@angular/core";
import { TimingsService } from "../services/timings/timings.service";
import { LeavesService } from "../services/leaves/leaves.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  userList: string = "";
  lastdate;
  monthArray = [];
  preBlanks = [];
  date;
  months;
  lastBlanks = [];
  currentUser;
  monthData;
  predefinedLeaves;
  @Input() calenderUserId: string;
  constructor(private timings: TimingsService, private leave: LeavesService) {
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  }
  ngOnChanges() {
    this.createCalendar();
  }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.date = new Date();
    this.createCalendar();
    // this.getdataForMonth();
  }
  getdataForMonth = () => {
    let userId = this.calenderUserId
      ? this.calenderUserId
      : this.currentUser.userId;
    this.timings.getdataForMonth(userId, this.date).subscribe(data => {
      this.monthData = data;
      this.leave.getLeaves().subscribe(predefinedLeaves => {
        this.predefinedLeaves = predefinedLeaves;
        this.showAccordingToDate();
      });
    });
  };
  createCalendar = () => {
    this.getdataForMonth();
    let date = new Date(this.date);
    date.getFullYear;
    date.getMonth() + 1;
    var firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let firstdayoftheweek = firstDate.getDay();
    var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.monthArray = this.createArrayofNumber(lastDate.getDate());
    this.preBlanks = this.createArrayofNumber(firstdayoftheweek);
    this.lastBlanks = lastDate.getDay()
      ? this.createArrayofNumber(7 - lastDate.getDay())
      : [];
  };

  createArrayofNumber = number => {
    var array = [];
    for (var i = 1; i <= number; i++) {
      array.push({ day: i });
    }
    return array;
  };
  prevMonth = () => {
    var makeDate = new Date(this.date);
    this.date = new Date(makeDate.setMonth(makeDate.getMonth() - 1));
    this.createCalendar();
  };
  nextMonth = () => {
    var makeDate = new Date(this.date);
    this.date = new Date(makeDate.setMonth(makeDate.getMonth() + 1));
    this.createCalendar();
  };
  showAccordingToDate = () => {
    this.monthArray.map(day => {
      this.monthData.map(data => {
        if (
          this.getFormatedDate(data.startTime, "") ==
          this.getFormatedDate(this.date, day.day)
        ) {
          day.data = data;
        }
        return data;
      });
      this.predefinedLeaves.map(leave => {
        if (
          this.getFormatedDate(leave.leaveDate, "") ==
          this.getFormatedDate(this.date, day.day)
        ) {
          day.leave = true;
        }
      });
    });

    // this.monthData.map(data => {
    //   if (
    //     this.getFormatedDate(data.startTime, "") ==
    //     this.getFormatedDate(this.date, day)
    //   ) {
    //     console.log("day here :- ", day);
    //     return data;
    //   }
    // });
  };

  formateTime = time => {
    let tm = new Date(time);
    let minutes =
      tm.getMinutes() < 10 ? "0" + tm.getMinutes() : tm.getMinutes();
    let seconds =
      tm.getSeconds() < 10 ? "0" + tm.getSeconds() : tm.getSeconds();
    return tm.getHours() + ":" + minutes + ":" + seconds;
  };
  getFormatedDate = (date, day) => {
    let dt = new Date(date);
    var month = dt.getMonth() + 1;
    let dateinit, newmonth, newdate;
    dateinit = day ? day : dt.getDate();
    newmonth = month < 10 ? "0" + month : month;
    newdate = dateinit < 10 ? "0" + dateinit : dateinit;
    return dt.getFullYear() + "-" + newmonth + "-" + newdate;
  };
}
