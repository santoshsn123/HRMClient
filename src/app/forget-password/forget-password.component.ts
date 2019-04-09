import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { UsersService } from "../services/users/users.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"]
})
export class ForgetPasswordComponent implements OnInit {
  registerForm: FormGroup;
  forgetPassword: FormGroup;
  submitted = false;
  ErrorMessage: string;
  SuccessMessage;
  forgetLinkId;
  missmatch: boolean = false;
  showoupdateForm: boolean = false;
  invalidLink: boolean = false;
  constructor(
    private router: Router,
    private data: DataService,
    private formBuilder: FormBuilder,
    private user: UsersService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => (this.forgetLinkId = params.id));
  }
  get f() {
    return this.registerForm.controls;
  }
  ngOnInit() {
    // console.log(this.forgetLinkId);
    if (this.forgetLinkId) {
      this.showoupdateForm = true;
      this.user.validateForgetPassLink(this.forgetLinkId).subscribe(
        status => {
          this.showoupdateForm = true;
        },
        error => {
          this.invalidLink = true;
          // this.showoupdateForm = false;
        }
      );
    } else {
      this.showoupdateForm = false;
    }
    this.forgetPassword = this.formBuilder.group({
      password: ["", [Validators.required]],
      cpassword: ["", [Validators.required]]
    });
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }
  onSubmit = () => {
    this.SuccessMessage = "";
    this.ErrorMessage = "";
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.user.forgetPassword(this.registerForm.value).subscribe(
        data => {
          this.SuccessMessage = data;
          this.SuccessMessage = this.SuccessMessage.message;
          // console.log(data);
        },
        error => {
          this.ErrorMessage = error.error.message;
        }
      );
    }
  };
  get reset() {
    return this.forgetPassword.controls;
  }
  resetPassword = () => {
    this.SuccessMessage = "";
    this.ErrorMessage = "";
    this.submitted = true;
    if (this.forgetPassword.invalid) {
      return;
    } else {
      if (
        this.forgetPassword.value.password !=
        this.forgetPassword.value.cpassword
      ) {
        this.missmatch = true;
        return false;
      } else {
        this.missmatch = false;
        this.user
          .resetPassword(this.forgetPassword.value, this.forgetLinkId)
          .subscribe(
            status => {
              // console.log("check it here :- ", status);
              this.SuccessMessage = status;
              this.SuccessMessage = this.SuccessMessage.message;
              this.forgetPassword.value.password = "";
              this.forgetPassword.value.cpassword = "";
            },
            error => {
              this.ErrorMessage = error.error.message;
            }
          );
      }
    }
  };
}
