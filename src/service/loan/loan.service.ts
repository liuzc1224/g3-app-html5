import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API } from "../../service/global_api";
import { Injectable } from "@angular/core";

@Injectable()
export class LoanService {
  constructor(private http: HttpClient) {}

  // makeLoanSer(data : Object ){
  //     const url = API.loan.makeLoan;

  //     const header = new HttpHeaders()
  //         .set("Content-type" , 'application/json') ;

  //     return this.http.post(url , data , {
  //         headers : header
  //     })
  // };

  getPurpose() {
    const url = API.loan.purpose;

    return this.http.get(url);
  }
  feebback(data){
    const url = API.loan.feedback;

    const header = new HttpHeaders().set("Content-type", "application/json");

    return this.http.post(url, data, {
      headers: header
    });
  }
}
