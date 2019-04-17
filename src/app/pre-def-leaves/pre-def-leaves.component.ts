import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  DialogOverviewExampleDialog,
  DialogData
} from "../users/users.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LeavesService } from "../services/leaves/leaves.service";

@Component({
  selector: "app-pre-def-leaves",
  templateUrl: "./pre-def-leaves.component.html",
  styleUrls: ["./pre-def-leaves.component.scss"]
})
export class PreDefLeavesComponent implements OnInit {
  showsuccessMessage;
  leavesList;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  showerrorMessage;
  loading: boolean = false;
  noLeaves;
  constructor(private dialog: MatDialog, private leaves: LeavesService) {}

  ngOnInit() {
    this.getLeaves();
  }
  getLeaves = () => {
    this.loading = true;
    this.leaves.getLeaves().subscribe(leaves => {
      this.loading = false;
      this.leavesList = leaves;
    });
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLeaves, {
      width: "500px",
      data: { uuid: "", type: "add" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "add") {
        this.getLeaves();
        this.showSuccessMessage("Record added successfully");
      }
    });
  }

  editLeave(leave): void {
    const dialogRef = this.dialog.open(DialogLeaves, {
      width: "500px",
      data: { uuid: leave.id, type: "edit" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "edit") {
        this.getLeaves();
        this.showSuccessMessage("Record edited successfully");
      }
    });
  }
  closeMessage() {
    this.showsuccessMessage = "";
    // this.showerrorMessage = "";
  }

  showSuccessMessage = message => {
    this.showsuccessMessage = message;
    setTimeout(() => {
      this.closeMessage();
    }, 1800);
  };

  deleteLeave = leave => {
    if (confirm("Do you really want to delete this Record?")) {
      this.leaves.deletLeave(leave.id).subscribe(data => {
        this.getLeaves();
        this.showSuccessMessage("Record Deleted successfully");
      });
    }
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

/*------------------Popup code--------------------*/

@Component({
  selector: "dialog-leaves",
  templateUrl: "dialog-leaves.html",
  styleUrls: ["./pre-def-leaves.component.scss"]
})
export class DialogLeaves {
  registerForm: FormGroup;
  submitted = false;
  userType;
  passwordmissmatch: boolean = false;
  showBankingError: string;
  errorMessage: string;
  FetchedUser;
  loading: boolean = false;

  // accountDetails
  constructor(
    public dialogRef: MatDialogRef<DialogLeaves>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private leaves: LeavesService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      // email: ["", [Validators.required, Validators.email]],
      leaveDate: ["", [Validators.required]],
      reason: ["", [Validators.required]],
      notify: [""]
    });

    //Fetch data to display in form to update
    if (this.data.type == "edit") {
      this.leaves.getSingleLeave(this.data.uuid).subscribe(FetchedUser => {
        this.FetchedUser = FetchedUser;
        console.log(FetchedUser);
        this.registerForm.patchValue({
          leaveDate: this.FetchedUser.leaveDate,
          reason: this.FetchedUser.reason,
          notify: this.FetchedUser.notify
        });
      });
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
      if (this.data.type == "edit") {
        this.leaves
          .updateLeaves(this.registerForm.value, this.data.uuid)
          .subscribe(data => {
            this.dialogRef.close("edit");
          });
      } else {
        this.leaves.addLeaves(this.registerForm.value).subscribe(data => {
          this.dialogRef.close("add");
        });
      }
    }
  }
}
