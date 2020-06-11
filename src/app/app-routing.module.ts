import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { StudentsComponent } from './components/dashboard/students/students.component';
import { InstructorsComponent } from './components/dashboard/instructors/instructors.component';
import { ScheduleComponent } from './components/dashboard/schedule/schedule.component';
import { FleetComponent } from './components/dashboard/fleet/fleet.component';
import { BranchesComponent } from './components/dashboard/branches/branches.component';
import { CoursesComponent } from './components/dashboard/courses/courses.component';
import { NotificationsComponent } from './components/dashboard/notifications/notifications.component';
import { SessionComponent } from './components/dashboard/session/session.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './components/about/about.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { ReviewComponent } from './components/dashboard/review/review.component';


const routes: Routes =
[
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', component: AboutComponent },
      { path: 'schools', component: SchoolsComponent }
    ]
  },
  { path: 'registration', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
  {
    path: 'app', component: SidenavComponent, canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
      { path: 'instructors', component: InstructorsComponent, canActivate: [AuthGuard] },
      { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
      { path: 'fleet', component: FleetComponent, canActivate: [AuthGuard] },
      { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
      { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
      { path: 'session', component: SessionComponent, canActivate: [AuthGuard] },
      { path: 'branches', component: BranchesComponent, canActivate: [AuthGuard] },
      { path: 'review', component: ReviewComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
