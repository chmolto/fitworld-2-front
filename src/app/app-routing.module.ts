import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SessionGuardian } from "./services/guardians/session-guardian";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GlobalFrameComponent } from './components/global-frame/global-frame.component';
import { HomeComponent } from './components/home/home.component';
import { UserConfigurationComponent } from './components/user-configuration/user-configuration.component';
import { AppConfigurationComponent } from './components/app-configuration/app-configuration.component';
import { RoutineComponent } from './components/routines/routine/routine.component';
import { AllRoutinesComponent } from './components/routines/all-routines/all-routines.component';

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
    component: GlobalFrameComponent,
    canActivate: [SessionGuardian],
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "profile",
        component: UserConfigurationComponent
      },
      {
        path: "settings",
        component: AppConfigurationComponent
      },
      {
        path: "routines/:id",
        component: RoutineComponent
      },
      {
        path: "routines",
        component: AllRoutinesComponent
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
