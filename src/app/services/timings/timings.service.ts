import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataService } from "src/app/data.service";

@Injectable({
  providedIn: "root"
})
export class TimingsService {
  baseUrl;
  constructor(private http: HttpClient, private global: DataService) {
    this.baseUrl = this.global.baseUrl;
  }
  punchIn = id => {
    return this.http.put(this.baseUrl + "/timings/punchin/" + id, {});
  };
  punchOut = id => {
    return this.http.put(this.baseUrl + "/timings/punchout/" + id, {});
  };
  getPunchStat = id => {
    return this.http.get(this.baseUrl + "/timings/getPunchStat/" + id);
  };
  getdataForMonth = (id, date) => {
    return this.http.get(
      this.baseUrl + "/timings/getMonthlyStat/" + id + "/" + date
    );
  };

  getWorkingDaysOfMonth = date => {
    return this.http.get(this.baseUrl + "/timings/getWorkingDays/" + date);
  };

  getLeavesofEmp = (id, date) => {
    return this.http.get(
      this.baseUrl + "/timings/getLeavesInMonth/" + id + "/" + date
    );
  };
  getSalaryMonth = (id, date) => {
    return this.http.get(
      this.baseUrl + "/timings/getSalaryMonth/" + id + "/" + date
    );
  };
}
