import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";
import { UserSessionService } from "../../../../services/user-session.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar-frame",
  templateUrl: "./sidebar-frame.component.html",
  styleUrls: ["./sidebar-frame.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SidebarFrameComponent {
  public displaySidebar: boolean;
  public navigationLinks: Array<{ name: string; icon: string; link: string }>;

  @Input()
  set display(status: boolean) {
    this.displaySidebar = status;
  }
  @Output()
  close = new EventEmitter<boolean>();

  constructor(public userService: UserSessionService, private router: Router) {
    this.navigationLinks = [
      {
        name: "Routines",
        icon: "fas fa-calendar-alt text-white",
        link: "index/routines/"
      },
      {
        name: "Active routine",
        icon: "fas fa-calendar-check text-white",
        link: "index/routines/active"
      },
      {
        name: "Physical progress tracker",
        icon: "fas fa-chart-line text-white",
        link: "index/physical-progress"
      }
    ];
  }

  public navigate(route: string) {
    this.router.navigateByUrl(route);
  }
}
