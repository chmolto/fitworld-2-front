import { Injectable, EventEmitter } from "@angular/core";
import { MatBottomSheet } from "@angular/material";
import { DialogConfirmationComponent } from "../micro-components/dialog-confirmation/dialog-confirmation.component";

@Injectable({
  providedIn: "root"
})
export class ConfirmationDialogService {
  constructor(private dialog: MatBottomSheet) {}

  public openConfirmationDialog(text: string): EventEmitter<boolean> {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: text
    });
    return dialogRef.instance.confirmation;
  }
}
