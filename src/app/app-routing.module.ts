import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { SessionGuardian } from "./services/guardians/session-guardian";
import { RegisterComponent } from "./login-register/register/register.component";
import { LoginComponent } from "./login-register/login/login.component";
import { ActiveRoutineComponent } from "./routines/active-routine/active-routine.component";
import { AllRoutinesComponent } from "./routines/all-routines/all-routines.component";
import { MainComponent } from './main/main/main.component';
import { ProfileComponent } from './main/profile/profile.component';
import { SettingsComponent } from './main/settings/settings.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "index",
    component: IndexComponent,
    canActivate: [SessionGuardian],
    children: [
      {
        path: "",
        component: MainComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "settings",
        component: SettingsComponent
      },
      {
        path: "routines/active",
        component: SettingsComponent
      },
      {
        path: "routines/all",
        component: SettingsComponent
      }
    ]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
