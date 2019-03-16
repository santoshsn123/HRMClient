import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  // {
  //   path: "users",
  //   component: UsersComponent
  // },
  // {
  //   path: "details/:id",
  //   component: DetailsComponent
  // },
  // {
  //   path: "posts/:id",
  //   component: PostsComponent
  // },
  // {
  //   path: "giftCard",
  //   component: GiftCardComponent
  // },
  // {
  //   path: "transactions",
  //   component: TransationsComponent
  // },
  // {
  //   path: "purchasedCredit",
  //   component: PurchasedBucksComponent
  // },
  {
    path: "login",
    component: LoginComponent
  }
  // {
  //   path: "changePassword",
  //   component: ChangePasswordComponent
  // },
  // {
  //   path: "convenienceFees",
  //   component: ConvenienceFeesComponent
  // },
  // {
  //   path: "convenienceFeesPaid",
  //   component: ConvenienceFeesPaidComponent
  // },
  // {
  //   path: "achTransfer",
  //   component: AchTransferComponent
  // },
  // { path: "**", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
