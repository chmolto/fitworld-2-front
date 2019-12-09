import { MessageService } from 'primeng/api';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login-registro/login/login.component";
import { RegistroComponent } from "./login-registro/registro/registro.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from "@angular/common/http";
import { ParticleEffectButtonModule } from "angular-particle-effect-button";
import { MatSnackBarModule } from "@angular/material";
import { HomeComponent } from "./login-registro/home/home.component";
import { TooltipModule } from "primeng/tooltip";
import { ToastModule } from "primeng/toast";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent
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
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
