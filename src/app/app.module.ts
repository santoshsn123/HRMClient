import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import {
  UsersComponent,
  DialogOverviewExampleDialog
} from "./users/users.component";
import { DetailsComponent } from "./details/details.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";

import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatNativeDateModule
} from "@angular/material";
import { GooglePlacesDirective } from "./google-places.directive";

import { NgxPaginationModule } from "ngx-pagination";

import { TransationsComponent } from "./transations/transations.component";

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";

import {
  FilterPipe,
  FilterUsers,
  FilterACHTransfer,
  FilterGiftCard,
  FilterBucksPurchased,
  FilterConveniencePaid
} from "./filter.pipe";

import { Angular2CsvModule, Angular2CsvComponent } from "angular2-csv";

import { ChangePasswordComponent } from "./change-password/change-password.component";

import { AuthenticationServiceService } from "./services/Autherisation/authentication-service.service";

import { MatTabsModule } from "@angular/material";
import {
  AchTransferComponent,
  DialogToShowACHDetails
} from "./ach-transfer/ach-transfer.component";

import { EmpRegisterComponent } from "./emp-register/emp-register.component";
import { PunchingComponent } from "./punching/punching.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileUpdateComponent } from "./profile-update/profile-update.component";
import { UsersCalenderComponent } from "./users-calender/users-calender.component";
import {
  PreDefLeavesComponent,
  DialogLeaves
} from "./pre-def-leaves/pre-def-leaves.component";
import {
  ApplyLeavesComponent,
  applyLeave
} from "./apply-leaves/apply-leaves.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { ImageUploadModule } from "angular2-image-upload";

@NgModule({
  declarations: [
    AppComponent,

    UsersComponent,
    DetailsComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    DialogOverviewExampleDialog,
    DialogToShowACHDetails,
    DialogLeaves,
    applyLeave,

    GooglePlacesDirective,

    TransationsComponent,
    FilterPipe,
    FilterUsers,
    FilterGiftCard,
    FilterACHTransfer,
    FilterBucksPurchased,
    FilterConveniencePaid,

    ChangePasswordComponent,

    AchTransferComponent,
    EmpRegisterComponent,
    PunchingComponent,
    CalendarComponent,
    ProfileComponent,
    ProfileUpdateComponent,
    UsersCalenderComponent,
    PreDefLeavesComponent,
    ApplyLeavesComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    Angular2CsvModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    ImageUploadModule.forRoot()
  ],
  providers: [
    MatDatepickerModule,
    Angular2CsvComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationServiceService,
      multi: true
    },
    FilterPipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogOverviewExampleDialog,
    DialogToShowACHDetails,
    DialogLeaves,
    applyLeave
  ],
  exports: [
    DialogOverviewExampleDialog,
    DialogToShowACHDetails,
    DialogLeaves,
    applyLeave
  ]
})
export class AppModule {}
