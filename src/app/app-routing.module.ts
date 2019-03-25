import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsersComponent } from "./users/users.component";
import { DetailsComponent } from "./details/details.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { ChangePasswordComponent } from "./change-password/change-password.component";

import { EmpRegisterComponent } from "./emp-register/emp-register.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileUpdateComponent } from "./profile-update/profile-update.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { PreDefLeavesComponent } from "./pre-def-leaves/pre-def-leaves.component";
import { ApplyLeavesComponent } from "./apply-leaves/apply-leaves.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "details/:id",
    component: DetailsComponent
  },

  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "updateProfile",
    component: ProfileUpdateComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "changePassword",
    component: ChangePasswordComponent
  },
  {
    path: "calender",
    component: CalendarComponent
  },
  { path: "allLeaves", component: PreDefLeavesComponent },
  { path: "leaveApplication", component: ApplyLeavesComponent },

  { path: "empRegisterLink/:linkId", component: EmpRegisterComponent },
  { path: "**", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
