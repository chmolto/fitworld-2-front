import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialog, MatBottomSheet } from "@angular/material";
import { DialogImgCropperComponent } from "src/app/micro-components/dialog-img-cropper/dialog-img-cropper.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserModel } from "../../models/user.model";
import { RestManagerService } from "../../services/rest-manager.service";
import { ApiRoutesConstants } from "src/app/constants/api-routes.constants";
import { Utilities } from "src/app/services/utilities";
import { UserSessionService } from "../../services/user-session.service";
import { DialogConfirmationComponent } from "../../micro-components/dialog-confirmation/dialog-confirmation.component";

@Component({
  selector: "app-user-configuration",
  templateUrl: "./user-configuration.component.html",
  styleUrls: ["./user-configuration.component.scss"]
})
export class UserConfigurationComponent {
  public formGroup: FormGroup;
  public selectedImage: string;
  public defaultImage: string;
  public showRemove: boolean;

  constructor(
    private matDialog: MatDialog,
    private snack: MatSnackBar,
    private dialog: MatBottomSheet,
    private restService: RestManagerService,
    public userService: UserSessionService
  ) {
    this.setFormGroup();
    this.defaultImage = "assets/defaults/avatar-user.png";
    this.selectedImage = this.userService.getUser().image
      ? this.userService.getUser().image
      : null;
    this.showRemove = false;
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
    this.formGroup = Utilities.changeControlDisableStatus(
      input,
      this.formGroup
    );
    this.formGroup.controls[input].setValue(null);

    if (input == "currentPassword") {
      this.formGroup = Utilities.changeControlDisableStatus(
        "repeatPassword",
        this.formGroup
      );
      this.formGroup = Utilities.changeControlDisableStatus(
        "password",
        this.formGroup
      );
    }
  }

  public updateUser() {
    this.dialogConfirmation().subscribe(confirmation => {
      if (confirmation) {
        if (
          Utilities.validateEnabledControls(this.formGroup) &&
          this.confirmPassword()
        ) {
          let user: UserModel = {
            username: this.formGroup.controls["username"].value,
            password: this.formGroup.controls["password"].value,
            oldPassword: this.formGroup.controls["currentPassword"].value,
            email: null,
            height: this.formGroup.controls["height"].value,
            weight: this.formGroup.controls["weight"].value,
            image: this.selectedImage
          };

          user = Utilities.parseUnsetPropertiesToNULL(user);
          this.restService
            .post(
              ApiRoutesConstants.UPDATE,
              user,
              ApiRoutesConstants.UPDATE_REMOTE
            )
            .subscribe(data => {
              this.handleUpdateResponse(data);
            });
        } else {
          this.formGroup.markAllAsTouched();
          this.snack.open("Invalid form", "OK", {
            duration: 2000
          });
        }
      }
    });
  }

  private handleUpdateResponse(data) {
    if (data.error) {
      this.snack.open(data.message, "OK", {
        duration: 2000
      });
    } else {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data));
      window.location.reload();
    }
  }

  private dialogConfirmation(): EventEmitter<boolean> {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: "Are you sure you want to update your profile?"
    });
    return dialogRef.instance.confirmation;
  }

  private confirmPassword(): boolean {
    return (
      this.formGroup.controls["repeatPassword"].value ==
      this.formGroup.controls["password"].value
    );
  }

  private setFormGroup() {
    this.formGroup = new FormGroup({
      username: new FormControl({ value: null, disabled: true }, [
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.required
      ]),
      password: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(
          /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        )
      ]),
      repeatPassword: new FormControl({ value: null, disabled: true }, [
        Validators.required
      ]),
      currentPassword: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(
          /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        )
      ]),
      height: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.min(1),
        Validators.max(3)
      ]),
      weight: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.min(20),
        Validators.max(500)
      ])
    });
  }
}
