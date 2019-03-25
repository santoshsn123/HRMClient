import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataService } from "../../data.service";

@Injectable({
  providedIn: "root"
})
export class TransactionsService {
  baseUrl: string;
  constructor(private http: HttpClient, private global: DataService) {
    this.baseUrl = this.global.baseUrl;
  }

  getAllTransactions = () => {
    return this.http.get(this.baseUrl + "/v1/admin/transactions");
  };
  getPurchasedBucks = () => {
    return this.http.get(this.baseUrl + "/v1/admin/pruchasedBucks");
  };

  getAllMerchants = () => {
    return this.http.get(this.baseUrl + "/v1/admin/activeMerchant");
  };
  getMTDMerchantPayout = () => {
    return this.http.get(this.baseUrl + "/v1/admin/MTDMerchantPayouts");
  };

  getMTDGiftCardPurchased = () => {
    return this.http.get(this.baseUrl + "/v1/admin/MTDGiftCardsPurchased");
  };
  getAllConvenienceFeesPaid = () => {
    return this.http.get(this.baseUrl + "/v1/admin/getAllConvenienceFeesPaid");
  };

  getMTDCreditPurchased = () => {
    return this.http.get(this.baseUrl + "/v1/admin/MTDCreditPurchased");
  };
  getACHTransactionDetails = () => {
    return this.http.get(this.baseUrl + "/v1/ach/getACHTransferDetails");
  };
  getDataBeforeTransactions = () => {
    return this.http.get(this.baseUrl + "/v1/ach/getDataBeforeTransactions");
  };
  generateACHTransfer = () => {
    return this.http.get(this.baseUrl + "/v1/ach/createFile");
  };
  getAllAdminCount = () => {
    return this.http.get(this.baseUrl + "/v1/admin/getAllAdminCount");
  };
}
