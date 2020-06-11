import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StudentsComponent } from './components/dashboard/students/students.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { InstructorsComponent } from './components/dashboard/instructors/instructors.component';
import { ScheduleComponent } from './components/dashboard/schedule/schedule.component';
import { FleetComponent } from './components/dashboard/fleet/fleet.component';
import { BranchesComponent } from './components/dashboard/branches/branches.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { SessionComponent } from './components/dashboard/session/session.component';
import { CoursesComponent } from './components/dashboard/courses/courses.component';
import { NotificationsComponent } from './components/dashboard/notifications/notifications.component';
import { RolesComponent } from './components/dashboard/roles/roles.component';
import { StudentService } from './services/student.service';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AboutComponent } from './components/about/about.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { SchoolreviewComponent } from './components/schoolreview/schoolreview.component';
import { RatingModule } from 'ng-starrating';
import { ReviewComponent } from './components/dashboard/review/review.component';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    PageNotFoundComponent,
    StudentsComponent,
    DashboardComponent,
    InstructorsComponent,
    ScheduleComponent,
    FleetComponent,
    BranchesComponent,
    SessionComponent,
    CoursesComponent,
    NotificationsComponent,
    RolesComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    RegistrationComponent,
    AboutComponent,
    SchoolsComponent,
    SchoolreviewComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ScheduleModule,
    RecurrenceEditorModule,
    FileUploadModule,
    DropDownListModule,
    DateTimePickerModule,
    RatingModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
