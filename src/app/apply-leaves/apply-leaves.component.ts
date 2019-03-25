import { Component, OnInit, Inject } from "@angular/core";
import { LeavesService } from "../services/leaves/leaves.service";
import { DialogData } from "../users/users.component";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-apply-leaves",
  templateUrl: "./apply-leaves.component.html",
  styleUrls: ["./apply-leaves.component.scss"]
})
export class ApplyLeavesComponent implements OnInit {
  constructor(public dialog: MatDialog, private leaves: LeavesService) {}
  leaveList;
  currentUser;
  showsuccessMessage;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  loading = false;
  showerrorMessage;
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.currentUser.userType === "employee"
      ? this.getOneUserleave()
      : this.getAllUserleave();
  }
  getOneUserleave = () => {
    this.loading = true;
    this.leaves.getoneUserLeaves(this.currentUser.userId).subscribe(leaves => {
      console.log(leaves);
      this.loading = false;
      this.leaveList = leaves;
    });
  };
  getAllUserleave = () => {
    console.log("inside admin Section ");
    this.loading = true;
    this.leaves.getallUserLeaves().subscribe(leaves => {
      console.log(leaves);
      this.loading = false;
      this.leaveList = leaves;
    });
  };
  applyLeaves = () => {
    const dialogRef = this.dialog.open(applyLeave, {
      width: "500px",
      data: { uuid: "", type: "add" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "add") {
        this.getAllUserleave();
        this.showSuccessMessage("Leave applied successfully");
      }
    });
  };

  showSuccessMessage = message => {
    this.showsuccessMessage = message;
    setTimeout(() => {
      this.closeMessage();
    }, 1800);
  };

  closeMessage() {
    this.showsuccessMessage = "";
  }
  getFormatedDate = (date, day) => {
    let dt = new Date(date);
    var month = dt.getMonth() + 1;
    let dateinit, newmonth, newdate;
    dateinit = day ? day : dt.getDate();
    newmonth = month < 10 ? "0" + month : month;
    newdate = dateinit < 10 ? "0" + dateinit : dateinit;
    return dt.getFullYear() + "-" + newmonth + "-" + newdate;
  };

  changeStatus = (lv, status) => {
    lv.status = status == "accept" ? 1 : 2;
    // leave.status
    this.leaves.updateSingleLeave(lv, lv.id).subscribe();
  };
}

/*------------------Popup code--------------------*/
@Component({
  selector: "dialog-apply-leaves",
  templateUrl: "dialog-apply-leaves.html",
  styleUrls: ["./apply-leaves.component.scss"]
})
export class applyLeave {
  registerForm: FormGroup;
  submitted = false;
  userType;
  passwordmissmatch: boolean = false;
  showBankingError: string;
  errorMessage: string;
  FetchedUser;
  loading: boolean = false;
  currentUser;

  // accountDetails
  constructor(
    public dialogRef: MatDialogRef<applyLeave>,
    private leaves: LeavesService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData // private gift: GiftCardService
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.registerForm = this.formBuilder.group({
      // email: ["", [Validators.required, Validators.email]],
      leaveDate: ["", [Validators.required]],
      reason: ["", [Validators.required]]
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.registerForm.value.userId = this.currentUser.userId;
      this.leaves.applyLeave(this.registerForm.value).subscribe(data => {
        this.dialogRef.close("add");
      });
    }
  }
}
