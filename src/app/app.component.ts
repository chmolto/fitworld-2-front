import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { RestManagerService } from "./services/rest-manager.service";
import { UserSessionService } from './services/user-session.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private restService: RestManagerService, private userService:UserSessionService) {}

  ngAfterViewInit(): void {
    if(localStorage.getItem("jwt")){
      this.restService.setJwt(localStorage.getItem("jwt"));
    }
    if(localStorage.getItem("user")){
      this.userService.setUser(JSON.parse(localStorage.getItem("user")));
    }
  }
}
