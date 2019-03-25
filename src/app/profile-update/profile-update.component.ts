import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "../services/users/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile-update",
  templateUrl: "./profile-update.component.html",
  styleUrls: ["./profile-update.component.scss"]
})
export class ProfileUpdateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private user: UsersService,
    private router: Router
  ) {}
  registerForm: FormGroup;
  UserId;
  currentUser;
  profileData;
  showsuccessMessage;
  showerrorMessage;
  loading: boolean = false;
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.UserId = this.currentUser.userId;

    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]]
    });
    this.getUserData(this.UserId);
  }

  getUserData = id => {
    this.user.getSingleUser(this.UserId).subscribe(data => {
      this.profileData = data;

      this.registerForm.patchValue({
        firstName: this.profileData.firstName,
        lastName: this.profileData.lastName,
        email: this.profileData.email,
        phone: this.profileData.phone,
        address: this.profileData.address
      });
    });
  };
  updateProf = () => {
    this.loading = true;
    this.user
      .updateUser(this.registerForm.value, this.UserId)
      .subscribe(data => {
        this.loading = false;
        this.router.navigate(["profile"]);
      });
  };
}
