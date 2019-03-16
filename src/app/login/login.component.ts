import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// import { DataService } from "../data.service";
// import { ACTION_LOGOUT, ACTION_LOGIN } from "../store/actions/appActions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { UsersService } from "../services/users/users.service";
import { NG_ANIMATING_CLASSNAME } from "@angular/animations/browser/src/util";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  // let showData
  visibal: string;
  visible: true;
  registerForm: FormGroup;
  submitted = false;
  ErrorMessage: string;
  message = "some Message";
  constructor(
    private router: Router,
    // private data: DataService,
    private formBuilder: FormBuilder // private user: UsersService
  ) {
    this.visibal = "yes new one";
    // this.data.setPageasLogin({ action: ACTION_LOGOUT });
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      // this.user
      //   .submitLogin({
      //     email: this.registerForm.controls.email.value,
      //     password: this.registerForm.controls.password.value
      //   })
      //   .subscribe(
      //     data => {
      //       this.ErrorMessage = "";
      //       this.data.setLoginDetails({ action: ACTION_LOGIN, user: data });
      //       this.router.navigate(["dashboard"]);
      //       localStorage.setItem("user", JSON.stringify(data));
      //     },
      //     error => {
      //       console.log("Data :- ", error);
      //       if (
      //         error.message ==
      //         "Http failure response for (unknown url): 0 Unknown Error"
      //       ) {
      //         this.ErrorMessage = "Network Error !!";
      //       } else {
      //         this.ErrorMessage = error.error.message;
      //       }
      //     }
      //   );
    }
  }
}
