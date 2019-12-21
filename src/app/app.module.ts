import { MessageService } from "primeng/api";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from "@angular/common/http";
import { ParticleEffectButtonModule } from "angular-particle-effect-button";
import { MatSnackBarModule } from "@angular/material";
import { TooltipModule } from "primeng/tooltip";
import { ToastModule } from "primeng/toast";
import { RestManagerService } from "./services/rest-manager.service";
import { SessionGuardian } from "./services/guardians/session-guardian";
import { SidebarModule } from "primeng/sidebar";
import { RegisterComponent } from "./login-register/register/register.component";
import { LoginComponent } from "./login-register/login/login.component";
import { ActiveRoutineComponent } from "./routines/active-routine/active-routine.component";
import { AllRoutinesComponent } from "./routines/all-routines/all-routines.component";
import { IndexComponent } from "./index/index.component";
import { MainComponent } from "./main/main/main.component";
import { ProfileComponent } from "./main/profile/profile.component";
import { SettingsComponent } from "./main/settings/settings.component";
import { FileUploadModule } from "primeng/fileupload";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogImgCropperComponent } from './utilities/dialog-img-cropper/dialog-img-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    ActiveRoutineComponent,
    AllRoutinesComponent,
    MainComponent,
    ProfileComponent,
    SettingsComponent,
    DialogImgCropperComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ParticleEffectButtonModule,
    MatSnackBarModule,
    TooltipModule,
    ToastModule,
    SidebarModule,
    FileUploadModule,
    MatDialogModule,
    ImageCropperModule,
  ],
  providers: [MessageService, RestManagerService, SessionGuardian],
  bootstrap: [AppComponent],
  entryComponents: [DialogImgCropperComponent]
})
export class AppModule {}
