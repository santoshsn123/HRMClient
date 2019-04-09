import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TimingsService } from "../services/timings/timings.service";
import { LeavesService } from "../services/leaves/leaves.service";
import { UsersService } from "../services/users/users.service";

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
  userData;
  isLoading: boolean = false;
  noOfLeaves: number = 0;

  @Input() calenderUserId: string;
  @Output() monthChange = new EventEmitter();
  constructor(
    private timings: TimingsService,
    private leave: LeavesService,
    private user: UsersService
  ) {
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
        this.user.getSingleUser(userId).subscribe(
          userData => {
            this.userData = userData;
            this.showAccordingToDate();
            this.isLoading = false;
          },
          erro => {
            this.isLoading = false;
          }
        );
      });
    });
  };
  createCalendar = () => {
    this.monthChange.emit(this.date);
    this.isLoading = true;
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
      day.empWasOnLeave = true;
      day.empWasOnLeave = this.compairDates(
        this.getFormatedDate(this.date, day.day),
        new Date()
      )
        ? false
        : this.compairDates(
            this.getFormatedDate(this.date, day.day),
            this.userData.createdAt
          )
        ? true
        : false;
      this.monthData.map(data => {
        if (
          this.getFormatedDate(data.startTime, "") ==
          this.getFormatedDate(this.date, day.day)
        ) {
          day.empWasOnLeave = false;
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
          day.leaveReason = leave.reason;
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

  // checkifAbsent = day => {
  //   return day.data
  //     ? false
  //     : this.compairDates(this.getFormatedDate(new Date(), day.day), new Date())
  //     ? false
  //     : true;
  // };
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

  compairDates = (date1, date2) => {
    let dt = new Date(date1);
    let dt2 = new Date(date2);
    return dt > dt2 ? true : false;
  };
}
