import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserSessionService {
  private currentUser: UserModel;
  private jwt: string;
  constructor(private router: Router) {}

  public setUser(user: UserModel) {
    this.currentUser = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser() {
    return this.currentUser;
  }

  public logout() {
    this.setJwt(null);
    localStorage.removeItem("jwt");
    this.router.navigateByUrl("/login");
  }

  public setJwt(jwt: string) {
    this.jwt = jwt;
  }

  public getJwt() {
    return this.jwt;
  }
}
