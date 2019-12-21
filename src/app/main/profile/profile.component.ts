import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { DialogImgCropperComponent } from "src/app/utilities/dialog-img-cropper/dialog-img-cropper.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public formGroup: FormGroup;
  public selectedImage: string;
  public defaultImage: string;
  public showRemove: boolean;
  constructor(private matDialog: MatDialog, private snack: MatSnackBar) {
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
      passwordRepeat: new FormControl({ value: "", disabled: true }, Validators.required)
    });

    this.defaultImage = "assets/defaults/avatar-user.png";
    this.showRemove = false;
  }

  ngOnInit() {}

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
}
