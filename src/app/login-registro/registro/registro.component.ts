import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"]
})
export class RegistroComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(
    private http: HttpClient,
    private route: Router
    ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl("", Validators.required),
      password1: new FormControl("", Validators.required),
      password2: new FormControl("", Validators.required)
    });
  }

  public doRegister() {
    let body = {
      username: this.formGroup.controls["username"].value,
      password: this.formGroup.controls["password1"].value
    };
    if (this.formGroup.valid) {
      this.http.post("http://localhost:3000/auth/signup/", body).subscribe(data => {
        this.route.navigateByUrl("/login");
      });
    }
  }
}
