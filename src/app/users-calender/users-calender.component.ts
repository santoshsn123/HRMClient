import { Component, OnInit } from "@angular/core";
import { UsersComponent } from "../users/users.component";
import { UsersService } from "../services/users/users.service";

@Component({
  selector: "app-users-calender",
  templateUrl: "./users-calender.component.html",
  styleUrls: ["./users-calender.component.scss"]
})
export class UsersCalenderComponent implements OnInit {
  constructor(private user: UsersService) {}
  empList;
  empId;
  ngOnInit() {
    this.getUserlist();
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
}
