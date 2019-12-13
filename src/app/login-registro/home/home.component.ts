import { Component, OnInit } from "@angular/core";
import { RestManagerService } from "../../services/rest-manager.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private restService: RestManagerService) {}
  public display: boolean;
  ngOnInit() {}

  public testJWT() {
    this.restService.post('http://localhost:3000/auth/test',[]).subscribe(res=>{});
  }
}
