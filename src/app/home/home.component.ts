import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { RestManagerService } from "../services/rest-manager.service";
import { Router } from "@angular/router";
import { SessionGuardian } from '../services/guardians/session-guardian';
import { UserSessionService } from '../services/user-session.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor(private restService: RestManagerService, private route: Router) {}
  public display: boolean;

  ngOnInit() {}

  public logout() {
    this.restService.storeJwt("");
    sessionStorage.removeItem('jwt');
    this.route.navigateByUrl("/login");
  }
}
