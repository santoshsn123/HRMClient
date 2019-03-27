import { Component, OnInit, Inject, Input } from "@angular/core";
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { UsersService } from "../services/users/users.service";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

export interface DialogData {
  uuid: string;
  type: string;
}

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: any;
  animal: string;
  name: string;
  showerrorMessage: string = "";
  showsuccessMessage: string = "";
  currentPage: number = 1;
  itemsPerPage: number = 10;
  userType: string = "";
  activestatus = "";
  loading: boolean = true;
  @Input() dashboardData: string;

  constructor(
    private data: DataService,
    private user: UsersService,
    public dialog: MatDialog,
    private router: Router
  ) {
    // console.log("dynamicdata : - ", this.dynamicdata);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "500px",
      data: { uuid: "", type: "add" }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if (result == "add") {
        this.loadUsers();
        this.showSuccessMessage("New user added successfully");
      }
      if (result == "edit") {
        this.loadUsers();
        this.showSuccessMessage("User Updated successfully");
      }
    });
  }

  showSuccessMessage = message => {
    this.showsuccessMessage = message;
    setTimeout(() => {
      this.closeMessage();
    }, 1800);
  };
  showErrorMessage = message => {
    this.showerrorMessage = message;
    setTimeout(() => {
      this.closeMessage();
    }, 1800);
  };

  ngOnInit() {
    // console.log("dynamicdata init : - ", this.dashboardData);

    this.loading = true;
    this.loadUsers();
    this.activestatus = this.dashboardData ? "active" : "";
  }
  closeMessage() {
    this.showsuccessMessage = "";
    this.showerrorMessage = "";
  }
  ActiveInactive = user => {
    if (user.isActive == 1) {
      if (confirm("Do you really want to Deactivate user?")) {
        this.updateStatus(user);
      }
    } else {
      if (confirm("Do you really want to Activate user?")) {
        this.updateStatus(user);
      }
    }
  };
  updateStatus = user => {
    this.user.changeUserStatus(user, user.id).subscribe(status => {
      this.loadUsers();
      this.showSuccessMessage("User status Updated successfully");
    });
  };
  loadUsers() {
    this.user.getAllUsers().subscribe(data => {
      console.log(data);
      this.users = data;
      this.loading = false;
    });
  }
  deleteUser(user) {
    // if (user.uuid == JSON.parse(localStorage.getItem("user")).uuid) {
    //   this.showErrorMessage("You can not Delete yourself!!");
    //   return false;
    // }
    // if (user.bucks_amount) {
    //   this.showErrorMessage("You can not Delete user having bucks in account");
    // } else {
    if (confirm("Do you really want to delete this user ?")) {
      this.user.deleteUser(user.id).subscribe(
        data => {
          this.loadUsers(); //loading Users after deleting users.
          this.showerrorMessage = "";
          this.showSuccessMessage("User Deleted successfully");
        },
        error => {
          this.showerrorMessage = error.error.message;
        }
      );
    }
    // else {
    //   }
    // }
  }

  editUser = user => {
    user.type = "edit";
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "500px",
      data: { uuid: user.id, type: "edit" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "edit") {
        this.loadUsers();
        this.showSuccessMessage("User Updated successfully");
      }
    });
  };
}

/*------------------Popup code--------------------*/

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "dialog-overview-example-dialog.html",
  styleUrls: ["./users.component.scss"]
})
export class DialogOverviewExampleDialog {
  registerForm: FormGroup;
  submitted = false;

  passwordmissmatch: boolean = false;
  showBankingError: string;
  errorMessage: string;
  FetchedUser;
  loading: boolean = false;

  // accountDetails
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private user: UsersService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      salary: [""]
    });

    //Fetch data to display in form to update
    if (this.data.type == "edit") {
      this.loading = true;
      this.user.getSingleUser(this.data.uuid).subscribe(FetchedUser => {
        this.loading = false;
        console.log("FetchedUser : -  ", FetchedUser);
        this.FetchedUser = FetchedUser;
        this.registerForm.patchValue({
          email: this.FetchedUser.email,
          firstName: this.FetchedUser.firstName,
          lastName: this.FetchedUser.lastName,
          salary: this.FetchedUser.salary
        });
      });
      //   this.FetchedUser = FetchedUser;
      //   this.registerForm.patchValue({
      //     email: this.FetchedUser.user.email,
      //     password: this.FetchedUser.user.password,
      //     phone: this.FetchedUser.user.phone,
      //     firstName: this.FetchedUser.user.firstName,
      //     lastName: this.FetchedUser.user.lastName,
      //     userType: this.FetchedUser.user.isMerchant
      //       ? "Merchant"
      //       : this.FetchedUser.user.isAdmin
      //       ? "Admin"
      //       : "User",
      //     userName: this.FetchedUser.user.userName,
      //     cpassword: this.FetchedUser.user.cpassword,
      //     bankRoutingNo: this.FetchedUser.bankdetails
      //       ? this.FetchedUser.bankdetails.bankRoutingNo
      //       : "",
      //     bankAccountNo: this.FetchedUser.bankdetails
      //       ? this.FetchedUser.bankdetails.bankAccountNo
      //       : "",
      //     bankAccountType: this.FetchedUser.bankdetails
      //       ? this.FetchedUser.bankdetails.bankAccountType
      //       : ""
      //   });
      //   this.registerForm.get("password").clearValidators();
      //   this.registerForm.get("password").updateValueAndValidity();
      //   this.registerForm.get("cpassword").clearValidators();
      //   this.registerForm.get("cpassword").updateValueAndValidity();
      // });
    }
    // this.registerForm.value=this.data;
  }

  get f() {
    return this.registerForm.controls;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  checkPasswords() {
    this.registerForm.controls.password.value ==
    this.registerForm.controls.cpassword.value
      ? (this.passwordmissmatch = true)
      : (this.passwordmissmatch = false);
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      // this.saveUser();
      console.log("Saving Users :- ", this.registerForm.value);
      this.loading = true;
      this.errorMessage = "";
      if (this.data.type == "add") {
        this.user.saveUser(this.registerForm.value).subscribe(
          data => {
            console.log(data);
            this.dialogRef.close("add");
            this.loading = false;
          },
          error => {
            this.loading = false;
            this.errorMessage = error.error.message;
          }
        );
      }
      if (this.data.type == "edit") {
        console.log("Update Here :- ", this.registerForm.value, this.data.uuid);
        this.user
          .updateUserByAdmin(this.registerForm.value, this.data.uuid)
          .subscribe(
            data => {
              console.log(data);
              this.dialogRef.close("edit");
              this.loading = false;
            },
            error => {
              this.loading = false;
              this.errorMessage = error.error.message;
            }
          );
      }
    }

    // alert('SUCCESS!! :-)')
  }

  saveUser = () => {
    this.loading = true;
    this.errorMessage = "";
    if (this.data.type == "add") {
      this.user.saveUser(this.registerForm.value).subscribe(
        data => {
          this.dialogRef.close("add");
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.errorMessage = error.error.message;
        }
      );
    } else {
      this.user
        .editUser(this.registerForm.value, this.FetchedUser.user.uuid)
        .subscribe(
          data => {
            this.loading = false;
            this.dialogRef.close("edit");
          },
          error => {
            this.loading = false;
            this.errorMessage = error.error.message;
          }
        );
    }
  };
}
