import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users/users.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  currentUser;
  UserId;
  profileData;
  showsuccessMessage;
  showerrorMessage;
  loading: boolean = false;
  imageUploadUrl;
  imageShowUrl;
  uploadImage: boolean = false;
  constructor(private user: UsersService, private mainData: DataService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.UserId = this.currentUser.userId;
    this.getprofiledata();

    this.imageUploadUrl = this.mainData.imageUploadUrl + this.UserId;
    this.imageShowUrl = this.mainData.imageShowUrl;
  }

  getprofiledata = () => {
    this.user.getSingleUser(this.UserId).subscribe(data => {
      this.profileData = data;
      this.profileData.createdAt = this.getFormatedDate(
        this.profileData.createdAt,
        ""
      );
      console.log(data);
    });
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
  onUploadFinished = event => {
    // console.log(event);
    this.getprofiledata();
    this.uploadImage = false;
  };
}
