import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { DialogImgCropperComponent } from "src/app/utilities/dialog-img-cropper/dialog-img-cropper.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserModel } from "../../models/user.model";
import { RestManagerService } from "../../services/rest-manager.service";
import { ApiRoutesConstants } from "src/app/constants/api-routes.constants";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent {
  public formGroup: FormGroup;
  public selectedImage: string;
  public defaultImage: string;
  public showRemove: boolean;
  public user: UserModel;

  //FORM CONTROLS
  public usernameControl: boolean;
  public passwordControl: boolean;
  public repeatPasswordControl: boolean;
  public currentPasswordControl: boolean;

  constructor(
    private matDialog: MatDialog,
    private snack: MatSnackBar,
    private restService: RestManagerService
  ) {
    this.user = JSON.parse(JSON.stringify(localStorage.getItem("user")));
    this.formGroup = new FormGroup({
      username: new FormControl({ value: "", disabled: true }, [
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.required
      ]),
      password: new FormControl({ value: "", disabled: true }, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(
          /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        )
      ]),
      repeatPassword: new FormControl(
        { value: "", disabled: true },
        Validators.required
      ),
      currentPassword: new FormControl({ value: "", disabled: true }, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(
          /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        )
      ]),
      height: new FormControl(
        { value: "", disabled: true },
        Validators.required
      ),
      weight: new FormControl(
        { value: "", disabled: true },
        Validators.required
      )
    });
    this.user.image ? (this.selectedImage = this.user.image) : null;
    this.defaultImage = "assets/defaults/avatar-user.png";
    this.showRemove = false;
    this.controlInputsStatus();
  }

  private controlInputsStatus() {
    this.formGroup.controls["username"].statusChanges.subscribe(status => {
      this.usernameControl = status === "INVALID" ? false : true;
    });

    this.formGroup.controls["password"].statusChanges.subscribe(status => {
      this.passwordControl = status === "INVALID" ? false : true;
    });

    this.formGroup.controls["currentPassword"].statusChanges.subscribe(
      status => {
        this.currentPasswordControl = status === "INVALID" ? false : true;
      }
    );

    this.formGroup.controls["repeatPassword"].valueChanges.subscribe(value => {
      if (value === this.formGroup.controls["password"].value) {
        this.repeatPasswordControl = true;
      } else {
        this.repeatPasswordControl = false;
      }
    });
  }

  public async handleFileInput(files: FileList) {
    let newImg: File = files[0];
    if (newImg.type.split("/")[0] == "image") {
      const dialogRef = this.matDialog.open(DialogImgCropperComponent, {
        width: "1200px",
        data: await this.getBase64(newImg)
      });
      dialogRef.componentInstance.croppedImgEmit.subscribe(croppedImg => {
        this.selectedImage = croppedImg;
      });
    } else {
      this.snack.open("Only image format supported", "OK", {
        duration: 2000
      });
    }
  }

  public async getBase64(file: File): Promise<any> {
    const toBase64 = file =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    return await toBase64(file);
  }

  public handleInputBlock(input: string) {
    this.formGroup.controls[input].disabled
      ? this.formGroup.controls[input].enable()
      : this.formGroup.controls[input].disable();

    this.formGroup.controls[input].setValue(null);

    switch (input) {
      case "username":
        this.usernameControl = null;
        break;
      case "password":
        this.passwordControl = null;
        this.formGroup.controls["repeatPassword"].disabled
          ? this.formGroup.controls["repeatPassword"].enable()
          : this.formGroup.controls["repeatPassword"].disable();
        this.formGroup.controls["currentPassword"].disabled
          ? this.formGroup.controls["currentPassword"].enable()
          : this.formGroup.controls["currentPassword"].disable();
        break;
    }
  }

  public updateUser() {
    let user: UserModel = {
      username: this.formGroup.controls["username"].value,
      password: this.formGroup.controls["password"].value,
      oldPassword: this.formGroup.controls["currentPassword"].value,
      email: null,
      height: this.formGroup.controls["height"].value,
      weight: this.formGroup.controls["weight"].value,
      image: this.selectedImage
    };

    this.restService
      .post(ApiRoutesConstants.UPDATE, user, ApiRoutesConstants.UPDATE_REMOTE)
      .subscribe(data => {
        this.handleUpdateResponse(data);
      });
  }

  private handleUpdateResponse(data) {
    if (data.error) {
      this.snack.open("Error updating user", "OK", {
        duration: 2000
      });
    } else {
      localStorage.removeItem("user");
      localStorage.setItem("user", data);
      window.location.reload();
    }
  }
}
