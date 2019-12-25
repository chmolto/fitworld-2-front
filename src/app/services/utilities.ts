import { FormGroup } from "@angular/forms";
export class Utilities {
  public static parseUnsetPropertiesToNULL(object: any): any {
    for (const [key, value] of Object.entries(object)) {
      if (value == "") {
        object[key] = null;
      }
    }
    return object;
  }

  public static validateEnabledControls(formGroup: FormGroup): boolean {
    let checker = true;
    Object.keys(formGroup.controls).forEach(key => {
      if (!formGroup.controls[key].disabled) {
        formGroup.controls[key].valid ? null : (checker = false);
      }
    });
    return checker;
  }

  public static changeControlDisableStatus(control: string, formGroup: FormGroup) {
    formGroup.controls[control].disabled
      ? formGroup.controls[control].enable()
      : formGroup.controls[control].disable();
    return formGroup;
  }
}
