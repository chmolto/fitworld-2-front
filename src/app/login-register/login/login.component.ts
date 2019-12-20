import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RestManagerService } from "../../services/rest-manager.service";
import { ApiRoutesConstants } from "src/app/constants/api-routes.constants";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;
  public hidden: boolean;
  public animateLink: boolean;
  public animateTwitter: boolean;
  public animateGoogle: boolean;
  constructor(
    private route: Router,
    private restService: RestManagerService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.animateGoogle = false;
    this.animateTwitter = false;
    this.formGroup = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  public setAnimation(type: string) {
    switch (type) {
      case "twitter":
        this.animateTwitter = !this.animateTwitter;
        break;
      case "google":
        this.animateGoogle = !this.animateGoogle;
        break;
    }
  }

  public doLogin() {
    if (this.formGroup.valid) {
      this.hidden = true;
      let body = {
        username: this.formGroup.controls["username"].value,
        password: this.formGroup.controls["password"].value
      };
      this.restService.post(ApiRoutesConstants.SIGNIN, body).subscribe(data => {
        if (data.accessToken) {
          setTimeout(() => {
            this.restService.storeJwt(data.accessToken);
            this.route.navigateByUrl("/index");
          }, 1000);
        } else {
          setTimeout(() => {
            this._snackBar.open("Invalid credentials.", "", {
              duration: 2000
            });
            this.hidden = false;
          }, 2000);
        }
      });
    } else {
      this._snackBar.open("Please enter username and password.", "", {
        duration: 2000
      });
    }
  }

  public redirectRegister() {
    this.route.navigateByUrl("/register");
  }
}
