import { Component, OnInit } from "@angular/core";
import { UsersComponent } from "../users/users.component";
import { UsersService } from "../services/users/users.service";
import { TimingsService } from "../services/timings/timings.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-users-calender",
  templateUrl: "./users-calender.component.html",
  styleUrls: ["./users-calender.component.scss"]
})
export class UsersCalenderComponent implements OnInit {
  constructor(
    private user: UsersService,
    private timings: TimingsService,
    private maindata: DataService
  ) {}
  empList;
  empId;
  workingDays;
  leavesofMonth;
  salaryofMonth;
  imageShowUrl;
  searchName;
  ngOnInit() {
    this.getUserlist();
    // this.getWorkingDayOfMonth();
    this.imageShowUrl = this.maindata.imageShowUrl;
  }
  getUserlist = () => {
    this.user.getUserlist().subscribe(data => {
      // console.log(data);
      this.empList = data;
      if (this.empList) {
        this.empId = this.empList[0].id;
      }
    });
  };

  setEmployee = id => {
    this.empId = id;
  };
  // getWorkingDayOfMonth = () => {
  //   this.timings.getWorkingDaysOfMonth(this.date).subscribe(workingDays => {
  //     // console.log(workingDays);
  //     this.workingDays = workingDays;
  //     this.workingDays = this.workingDays.workingDays;
  //   });
  // };
  calenderChanged = date => {
    if (date) {
      this.timings.getWorkingDaysOfMonth(date).subscribe(workingDays => {
        this.workingDays = workingDays;
        this.workingDays = this.workingDays.workingDays;
      });
      this.getLeavesOfMonth(date);
      this.getSalaryOfTheMonth(date);
    }
  };
  getLeavesOfMonth = date => {
    this.timings.getLeavesofEmp(this.empId, date).subscribe(leavesofMonth => {
      this.leavesofMonth = leavesofMonth;
      this.leavesofMonth = this.leavesofMonth.leavesInMonth;
    });
  };
  getSalaryOfTheMonth = date => {
    this.timings.getSalaryMonth(this.empId, date).subscribe(monthSalary => {
      console.log(monthSalary);
      this.salaryofMonth = monthSalary;
      this.salaryofMonth = this.salaryofMonth.monthSalary;
    });
  };
}
