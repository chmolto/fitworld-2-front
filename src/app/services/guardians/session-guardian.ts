import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CanActivate,
} from "@angular/router";
import { RestManagerService } from '../rest-manager.service';

@Injectable()
export class SessionGuardian implements CanActivate {
  constructor(private router:Router, private restService:RestManagerService) {}
  canActivate() {
    return this.restService.getJwt() ? true : this.router.navigateByUrl("/login");
  }
}
