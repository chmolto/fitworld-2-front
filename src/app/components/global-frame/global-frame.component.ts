import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { RestManagerService } from "src/app/services/rest-manager.service";
import { UserSessionService } from "../../services/user-session.service";

@Component({
  selector: "app-global-frame",
  templateUrl: "./global-frame.component.html",
  styleUrls: ["./global-frame.component.scss"]
})
export class GlobalFrameComponent implements OnInit {
  constructor(
    private restService: RestManagerService,
    public router: Router,
    private userService: UserSessionService
  ) {
    this.displaySidebar = false;
  }
  public displaySidebar: boolean;

  ngOnInit() {}

  public logout() {
    this.userService.logout();
  }

  public setDisplaySidebar(status: boolean) {
    this.displaySidebar = status;
  }
}
