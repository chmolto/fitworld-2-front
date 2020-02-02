import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivate } from "@angular/router";
import { RestManagerService } from "../rest-manager.service";
import { UserSessionService } from "../user-session.service";

@Injectable()
export class SessionGuardian implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserSessionService
  ) {}
  canActivate() {
    return this.userService.getJwt()
      ? true
      : this.router.navigateByUrl("/login");
  }
}
