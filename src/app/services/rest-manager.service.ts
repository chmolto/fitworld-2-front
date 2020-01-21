import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { of, concat, pipe } from "rxjs";
import { ApiRoutesConstants } from "../constants/api-routes.constants";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root"
})
export class RestManagerService {
  private headers: HttpHeaders;
  private jwt: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.headers = new HttpHeaders();
  }

  public setJwt(jwt: string) {
    this.jwt = jwt;
    this.headers = this.headers.set("Authorization", `Bearer ${jwt}`);
  }

  public getJwt() {
    return this.jwt;
  }

  public get(ruta: string) {
    return this.http
      .get(ruta, {
        headers: this.headers
      })
      .pipe(
        catchError(err =>
          of(err).pipe(tap(err => this.displayToastError(err.error)))
        )
      );
  }

  public post(ruta: string, body: any, rutaRetry?: string) {
    return this.http
      .post(ruta, body, {
        headers: this.headers
      })
      .pipe(
        catchError(err =>
          of(err).pipe(tap(err => this.displayToastError(err.error)))
        )
      );
  }

  private displayToastError(error) {
    this.messageService.add({
      severity: "error",
      summary: `${error.statusCode} ${error.error}`,
      detail: "Network error",
      life: 3000
    });
  }

  /*   private retryOnlineBack(rutaRetry: string, body: any) {
    return this.http
      .post(rutaRetry, body, {
        headers: this.headers
      })
      .pipe(catchError(err => of(err)));
  } */
}
