import { Injectable } from "@angular/core";
import { DataService } from "src/app/data.service";
import { HttpClient } from "@angular/common/http";
import { identifierModuleUrl } from "@angular/compiler";

@Injectable({
  providedIn: "root"
})
export class LeavesService {
  baseUrl;

  constructor(private http: HttpClient, private global: DataService) {
    this.baseUrl = this.global.baseUrl;
  }

  addLeaves = Object => {
    return this.http.post(this.baseUrl + "/leaves/", Object);
  };

  updateLeaves = (Object, id) => {
    return this.http.put(this.baseUrl + "/leaves/" + id, Object);
  };
  getLeaves = () => {
    return this.http.get(this.baseUrl + "/leaves/");
  };
  getSingleLeave = id => {
    return this.http.get(this.baseUrl + "/leaves/" + id);
  };
  deletLeave = id => {
    return this.http.delete(this.baseUrl + "/leaves/" + id);
  };
  getoneUserLeaves = id => {
    return this.http.get(this.baseUrl + "/leaves/apply/user/" + id);
  };

  getallUserLeaves = () => {
    return this.http.get(this.baseUrl + "/leaves/apply/admin/");
  };
  applyLeave = Object => {
    return this.http.post(this.baseUrl + "/leaves/apply/", Object);
  };
  updateSingleLeave = (Object, id) => {
    return this.http.put(this.baseUrl + "/leaves/apply/" + id, Object);
  };
}
