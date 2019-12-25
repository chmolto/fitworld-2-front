import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { RestManagerService } from "src/app/services/rest-manager.service";

@Component({
  selector: "app-global-frame",
  templateUrl: "./global-frame.component.html",
  styleUrls: ["./global-frame.component.scss"]
})
export class GlobalFrameComponent implements OnInit {
  constructor(private restService: RestManagerService, public router: Router) {
    this.displaySidebar = false;
  }
  public displaySidebar: boolean;

  ngOnInit() {}

  public logout() {
    this.restService.setJwt(null);
    localStorage.removeItem("jwt");
    this.router.navigateByUrl("/login");
  }

  public setDisplaySidebar(status: boolean) {
    this.displaySidebar = status;
  }
}
