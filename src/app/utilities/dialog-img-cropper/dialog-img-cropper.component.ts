import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ImageCropperComponent } from "ngx-image-cropper";

@Component({
  selector: "app-dialog-img-cropper",
  templateUrl: "./dialog-img-cropper.component.html",
  styleUrls: ["./dialog-img-cropper.component.scss"]
})
export class DialogImgCropperComponent implements OnInit {
  @Output()
  public croppedImgEmit = new EventEmitter<string>();
  public croppedImg: string;
  @ViewChild(ImageCropperComponent, { static: false })
  imageCropper: ImageCropperComponent;
  flipVerticalIcon: boolean;
  flipHorizontalIcon: boolean;
  constructor(
    public dialogRef: MatDialogRef<DialogImgCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.flipHorizontalIcon = true;
    this.flipVerticalIcon = true;
  }

  public rotateImg() {
    this.imageCropper.rotateLeft();
  }

  public flipVerticalImg() {
    this.flipVerticalIcon = !this.flipVerticalIcon;
    this.imageCropper.flipVertical();
  }

  public flipHorizontalImg() {
    this.flipHorizontalIcon = !this.flipHorizontalIcon;
    this.imageCropper.flipHorizontal();
  }

  public setCropped(cropEvent) {
    this.croppedImg = cropEvent.base64;
  }

  public emitCroppedImg() {
    this.croppedImgEmit.emit(this.croppedImg);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
