import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";
import { UserSessionService } from "../../../../services/user-session.service";

@Component({
  selector: "app-sidebar-frame",
  templateUrl: "./sidebar-frame.component.html",
  styleUrls: ["./sidebar-frame.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SidebarFrameComponent implements OnInit {
  public displaySidebar: boolean;

  @Input()
  set display(status: boolean) {
    this.displaySidebar = status;
  }
  @Output()
  close = new EventEmitter<boolean>();

  constructor(public userService: UserSessionService) {}

  ngOnInit() {}
}
