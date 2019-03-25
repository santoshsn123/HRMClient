import { Component, OnInit, Inject, Input } from "@angular/core";
import { TransactionsService } from "../services/transactions/transactions.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from "../users/users.component";
import { UsersService } from "../services/users/users.service";

@Component({
  selector: "app-ach-transfer",
  templateUrl: "./ach-transfer.component.html",
  styleUrls: ["./ach-transfer.component.scss"]
})
export class AchTransferComponent implements OnInit {
  transactions;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  downloadUrl;
  loading: boolean = false;
  showsuccessMessage;
  @Input() dashboardACH: string;
  constructor(
    private transaction: TransactionsService,
    private dialog: MatDialog
  ) {
    this.downloadUrl = transaction.baseUrl + "/v1/ach/download/";
  }

  ngOnInit() {
    this.getDetails();
  }

  getDetails = () => {
    this.loading = true;
    this.transaction.getACHTransactionDetails().subscribe(data => {
      this.loading = false;
      this.transactions = data;
    });
  };
  showSuccessMessage = message => {
    this.showsuccessMessage = message;
    setTimeout(() => {
      this.showsuccessMessage = "";
    }, 1800);
  };

  transferACH = () => {
    const dialogRef = this.dialog.open(DialogToShowACHDetails, {
      width: "500px",
      data: { uuid: "", type: "add" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.showSuccessMessage("Transaction done successfully");
        this.getDetails();
      }
    });
  };
}

/** Modal Code is here   */

@Component({
  selector: "dialog-ach-transfer",
  templateUrl: "dialog-ach-transfer.html",
  styleUrls: ["./ach-transfer.component.scss"]
})
export class DialogToShowACHDetails {
  // accountDetails
  predata;
  successMessage;
  loading: boolean = true;
  totalUsers = [];
  invalidUsers = [];
  constructor(
    public dialogRef: MatDialogRef<DialogToShowACHDetails>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private user: UsersService,
    private transaction: TransactionsService
  ) {}

  ngOnInit() {
    this.fetchStatus();
  }
  fetchStatus = () => {
    this.loading = true;
    this.transaction.getDataBeforeTransactions().subscribe(data => {
      console.log("Data :- ", data);
      this.loading = false;
      this.predata = data;
      this.totalUsers = this.predata.totalUsers;
      this.invalidUsers = this.predata.invalidUsers;
    });
  };
  onSubmit = () => {
    this.loading = true;
    this.transaction.generateACHTransfer().subscribe(data => {
      this.loading = false;
      this.successMessage = "ACH Files created successfully";
      // console.log(data);
      this.fetchStatus();
      this.dialogRef.close("success");
    });
  };
}
