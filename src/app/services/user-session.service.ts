import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class UserSessionService {
  private currentUser: UserModel;
  constructor() {}

  public setUser(user: UserModel) {
    this.currentUser = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser() {
    return this.currentUser;
  }
}
