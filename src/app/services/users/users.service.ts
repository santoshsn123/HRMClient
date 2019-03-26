import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataService } from "../../data.service";
@Injectable({
  providedIn: "root"
})
export class UsersService {
  baseUrl: string;
  token: string;
  userData;
  constructor(private http: HttpClient, private global: DataService) {
    this.baseUrl = this.global.baseUrl;
  }

  submitLogin(Object) {
    return this.http.post(this.baseUrl + "/admin/login", Object);
  }
  saveUser(Object) {
    return this.http.post(this.baseUrl + "/admin/basicEmpDetails", Object);
  }

  getAllUsers() {
    return this.http.get(this.baseUrl + "/admin/users");
  }

  getEmpRegStatus(id) {
    return this.http.get(this.baseUrl + "/admin/userStatus/" + id);
  }
  updateUser(Object, id) {
    return this.http.put(this.baseUrl + "/admin/users/" + id, Object);
  }

  updateUserByAdmin(Object, id) {
    return this.http.put(this.baseUrl + "/admin/usersByAdmin/" + id, Object);
  }

  deleteUser(id) {
    return this.http.delete(this.baseUrl + "/admin/users/" + id);
  }

  changeUserStatus = (Object, uuid) => {
    return this.http.put(this.baseUrl + "/admin/userStatus/" + uuid, Object);
  };

  getSingleUser = id => {
    return this.http.get(this.baseUrl + "/user/user/" + id);
  };

  getUserlist = () => {
    return this.http.get(this.baseUrl + "/user/user/");
  };

  changePassword = (Object, id) => {
    return this.http.put(this.baseUrl + "/user/changePassword/" + id, Object);
  };

  editUser = (Object, uuid) => {
    return this.http.put(this.baseUrl + "/v1/users/" + uuid, Object);
  };

  getMerchants = () => {
    return this.http.get(this.baseUrl + "/v1/admin/getMerchants/");
  };
  setUserData = data => (this.userData = data);
  getUserData = () => {
    return this.userData;
  };
  getAllTransactionsForUser = uuid => {
    return this.http.get(
      this.baseUrl + "/v1/admin/completeTransactionForUser/" + uuid
    );
  };

  getBucksTransferDetails = uuid => {
    return this.http.get(this.baseUrl + "/v1/admin/userBucksTransfer/" + uuid);
  };

  getGiftCardPurchaseDetails = uuid => {
    return this.http.get(
      this.baseUrl + "/v1/admin/getGiftCardPurchaseDetails/" + uuid
    );
  };

  getMerchantACHTransferDetails = uuid => {
    return this.http.get(
      this.baseUrl + "/v1/admin/getMerchantACHTransferDetails/" + uuid
    );
  };

  getUserPurchasedBucks = uuid => {
    return this.http.get(
      this.baseUrl + "/v1/admin/getUserPurchasedBucks/" + uuid
    );
  };

  getSpentGiftCards = uuid => {
    return this.http.get(this.baseUrl + "/v1/admin/getSpentGiftCards/" + uuid);
  };
}
