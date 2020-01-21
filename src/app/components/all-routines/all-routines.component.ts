import { Routine } from "./../../models/routine.model";
import { Component, OnInit } from "@angular/core";
import { RestManagerService } from "../../services/rest-manager.service";
import { ApiRoutesConstants } from "../../constants/api-routes.constants";

@Component({
  selector: "app-all-routines",
  templateUrl: "./all-routines.component.html",
  styleUrls: ["./all-routines.component.scss"]
})
export class AllRoutinesComponent implements OnInit {
  public routines: Routine[];
  constructor(private restManagerService: RestManagerService) {
    this.routines = [];
    this.restManagerService
      .get(ApiRoutesConstants.ROUTINES)
      .subscribe((routines: Routine[]) => {
        this.routines = routines;
      });
  }

  ngOnInit() {}
}
