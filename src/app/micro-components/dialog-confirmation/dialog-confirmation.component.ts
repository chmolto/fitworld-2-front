import { Component, OnInit, EventEmitter, Inject } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material";

@Component({
  selector: "app-dialog-confirmation",
  templateUrl: "./dialog-confirmation.component.html",
  styleUrls: ["./dialog-confirmation.component.scss"]
})
export class DialogConfirmationComponent {
  public confirmation = new EventEmitter<boolean>();
  public title: string;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private dialogRef: MatBottomSheetRef<DialogConfirmationComponent>
  ) {
    this.title = data;
  }

  public response(status: boolean) {
    this.confirmation.emit(status);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.dismiss();
  }
}
