import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RestManagerService {
  private headers: HttpHeaders;
  private jwt: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
  }

  public storeJwt(jwt: string) {
    sessionStorage.setItem("jwt", jwt);
    this.setJwt(jwt);
  }

  public setJwt(jwt: string) {
    this.jwt = jwt;
    this.headers = this.headers.set("Authorization", `Bearer ${jwt}`);
  }

  public getJwt() {
    return this.jwt;
  }

  public post(ruta: string, body: any) {
    return this.http
      .post(ruta, body, {
        headers: this.headers
      })
      .pipe(catchError(err => of(err)));
  }
}
