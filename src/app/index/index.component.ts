import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { RestManagerService } from "../services/rest-manager.service";
import { Router } from "@angular/router";
import { SessionGuardian } from '../services/guardians/session-guardian';
import { UserSessionService } from '../services/user-session.service';

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  constructor(private restService: RestManagerService, public router: Router) {}
  public display: boolean;

  ngOnInit() {}

  public logout() {
    this.restService.storeJwt(null);
    sessionStorage.removeItem('jwt');
    this.router.navigateByUrl("/login");
  }
}
