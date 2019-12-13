import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login-registro/login/login.component";
import { RegistroComponent } from "./login-registro/registro/registro.component";
import { HomeComponent } from './login-registro/home/home.component';
import { SessionGuardian } from './services/guardians/session-guardian';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registro",
    component: RegistroComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [SessionGuardian]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
