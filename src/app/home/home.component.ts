import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { RestManagerService } from "../services/rest-manager.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor(private restService: RestManagerService) {}
  public display: boolean;
  ngOnInit() {}
}
