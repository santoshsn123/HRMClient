import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "../services/users/users.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-emp-register",
  templateUrl: "./emp-register.component.html",
  styleUrls: ["./emp-register.component.scss"]
})
export class EmpRegisterComponent implements OnInit {
  userId: string;
  userData;
  registerForm: FormGroup;
  invalidForm: boolean = false;
  submitted: boolean = false;
  confPaasswordError: string;
  cpasswordValidation: boolean = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UsersService,
    private formBuilder: FormBuilder
  ) {
    this.route.params.subscribe(params => (this.userId = params.linkId));
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      phone: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      address: ["", [Validators.required]],
      password: ["", [Validators.required]],
      cpassword: ["", [Validators.required]]
    });

    console.log("Before call", this.userId);
    this.getEmpRegStatus();
  }
  // checkPasswords() {
  // this.registerForm.controls.password.value ==
  // this.registerForm.controls.cpassword.value
  //   ? (this.passwordmissmatch = true)
  //   : (this.passwordmissmatch = false);
  // }
  getEmpRegStatus = () => {
    this.user.getEmpRegStatus(this.userId).subscribe(
      data => {
        // if(data)
        this.userData = data;
        // this.registerForm.controls.firstName.value = this.userData.firstName;
        this.registerForm.patchValue({
          email: this.userData.email,
          firstName: this.userData.firstName,
          lastName: this.userData.lastName
        });
      },
      err => {
        // console.log(err.status);
        this.invalidForm = err.status == 400 ? true : false;
      }
    );
  };

  checkPasswords() {
    return (this.cpasswordValidation =
      this.registerForm.controls.password.value ==
      this.registerForm.controls.cpassword.value
        ? true
        : false);
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit = () => {
    this.submitted = true;
    if (this.checkPasswords() && !this.registerForm.invalid) {
      this.user
        .updateUser(this.registerForm.value, this.userData.id)
        .subscribe(data => {
          this.getEmpRegStatus();
        });
    }
  };
}
