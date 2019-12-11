import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RestManagerService } from "../../services/rest-manager.service";
import { ApiRoutesConstants } from "../../constants/api-routes.constants";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"]
})
export class RegistroComponent implements OnInit {
  public formGroup: FormGroup;
  public hidden: boolean;

  //FORM CONTROLS
  public usernameControl: boolean;
  public password1Control: boolean;
  public password2Control: boolean;
  public emailControl: boolean;

  constructor(
    private restService: RestManagerService,
    private route: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl("", [
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.required
      ]),
      password1: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(
          /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        )
      ]),
      password2: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.pattern(
          /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        Validators.required
      ])
    });
    this.controlInputsStatus();
  }

  private controlInputsStatus() {
    this.formGroup.controls["username"].statusChanges.subscribe(status => {
      this.usernameControl = status === "INVALID" ? false : true;
    });

    this.formGroup.controls["password1"].statusChanges.subscribe(status => {
      this.password1Control = status === "INVALID" ? false : true;
    });

    this.formGroup.controls["password2"].valueChanges.subscribe(value => {
      if (value === this.formGroup.controls["password1"].value) {
        this.password2Control = true;
      } else {
        this.password2Control = false;
      }
    });

    this.formGroup.controls["email"].statusChanges.subscribe(status => {
      this.emailControl = status === "INVALID" ? false : true;
    });
  }

  private checkPasswordsAreEqual(): boolean {
    return (
      this.formGroup.controls["password1"].value ===
      this.formGroup.controls["password2"].value
    );
  }

  private checkForm(): boolean {
    if (!this.formGroup.valid) {
      this.messageService.add({
        severity: "error",
        summary: "Invalid form",
        detail: "* Please check all the fields",
        life: 3000
      });
      return false;
    }
    if (!this.checkPasswordsAreEqual()) {
      this.messageService.add({
        severity: "error",
        summary: "Passwords error",
        detail: "* Passwords dont match",
        life: 3000
      });
      return false;
    }
    return true;
  }

  public doRegister() {
    if (this.checkForm()) {
      this.hidden = true;
      let body = {
        username: this.formGroup.controls["username"].value,
        password: this.formGroup.controls["password1"].value,
        email: this.formGroup.controls["email"].value
      };
      this.restService.post(ApiRoutesConstants.SIGNUP, body).subscribe(data => {
        if (!data) {
          setTimeout(() => {
            this.route.navigateByUrl("/login");
          }, 1000);
        } else {
          setTimeout(() => {
            alert(data.error.message[0].constraints.matches);
            this.hidden = false;
          }, 2000);
        }
      });
    }
  }
}
