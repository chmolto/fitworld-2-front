import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { of, concat, pipe } from "rxjs";
import { ApiRoutesConstants } from "../constants/api-routes.constants";
import { MessageService } from "primeng/api";
import { UserSessionService } from "./user-session.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RestManagerService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private userService: UserSessionService
  ) {
    this.headers = new HttpHeaders();
  }

  public get(ruta: string) {
    return this.http
      .get(ruta, {
        headers: this.headers.set(
          "Authorization",
          `Bearer ${this.userService.getJwt()}`
        )
      })
      .pipe(
        catchError(err => of(err).pipe(tap(err => this.handleError(err.error))))
      );
  }

  public post(ruta: string, body: any, rutaRetry?: string) {
    return this.http
      .post(ruta, body, {
        headers: this.headers.set(
          "Authorization",
          `Bearer ${this.userService.getJwt()}`
        )
      })
      .pipe(
        catchError(err => of(err).pipe(tap(err => this.handleError(err.error))))
      );
  }

  public put(ruta: string, body: any, rutaRetry?: string) {
    return this.http
      .put(ruta, body, {
        headers: this.headers.set(
          "Authorization",
          `Bearer ${this.userService.getJwt()}`
        )
      })
      .pipe(
        catchError(err => of(err).pipe(tap(err => this.handleError(err.error))))
      );
  }

  private handleError(error) {
    if (error.statusCode === 401) {
      this.userService.logout();
    }
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
