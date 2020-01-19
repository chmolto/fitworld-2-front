import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root"
})
export class ToastManagerService {
  constructor(private messageService: MessageService) {}

  public successToast(detail: string, summary?: string, life?: number) {
    this.messageService.add({
      severity: "success",
      summary: summary ? summary : "Success",
      detail,
      life: life ? life : 99999
    });
  }

  public errorToast(detail: string, summary?: string, life?: number) {
    this.messageService.add({
      severity: "error",
      summary: summary ? summary : "Error",
      detail,
      life: life ? life : 99999
    });
  }

  public infoToast(detail: string, summary?: string, life?: number) {
    this.messageService.add({
      severity: "info",
      summary: summary ? summary : "Info",
      detail,
      life: life ? life : 3000
    });
  }

  public warnToast(detail: string, summary?: string, life?: number) {
    this.messageService.add({
      severity: "warn",
      summary: summary ? summary : "Warning",
      detail,
      life: life ? life : 3000
    });
  }
}
