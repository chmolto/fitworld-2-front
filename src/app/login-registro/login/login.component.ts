import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RestManagerService } from '../../services/rest-manager.service';
import { ApiRoutesConstants } from 'src/app/constants/api-routes.constants';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(
    private route: Router,
    private restService:RestManagerService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  public doLogin() {
    let body = {
      username: this.formGroup.controls["username"].value,
      password: this.formGroup.controls["password"].value
    };
    if (this.formGroup.valid) {
      this.restService.post(ApiRoutesConstants.SIGNIN, body).subscribe(data => {
        console.log(data);
      });
    }
  }

  public redirectRegistro() {
    this.route.navigateByUrl("/registro");
  }
}
