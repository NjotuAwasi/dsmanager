import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { SchoolService } from 'src/app/services/school.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/session';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  public sessions: Session[];
  public sess = new Session();
  date = new Date();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  session = JSON.parse(sessionStorage.getItem('token'));
  durationInSeconds = 5;

  constructor(private sessionService: SessionService,
    private schoolService: SchoolService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    if (this.session.school == null) {
      this.sessionService.getSessions().subscribe((sessions) => {
        console.log(this.session.school);
        this.sessions = sessions;
      }, (error) => {
        console.log(error);
      });
    } else {
      this.sessionService.getSessionsBySchool(this.session.school.id).subscribe((sessions) => {
        console.log(this.session.school);
        this.sessions = sessions;
      }, (error) => {
        console.log(error);
      });
    }
  }
  openSnackBar() {
    this.snackbar.open('Session deleted successfully', '', {
      duration: this.durationInSeconds * 1000
    });
  }
  updateSession(id: number) {
    this.sessionService.getSession(id).subscribe(data => {
      console.log(data);
      this.sess = data;
    }, error => {
      console.log(error);
    })
  }
  undefine() {
    this.sess = new Session();
  }
  processForm() {
    if (this.sess.id === undefined) {
      this.sessionService.addSession(this.sess, this.session.school.id, this.session.id).subscribe((sess) => {
        console.log(sess);
        this.redirectTo('/app/session');
        this.snackbar.open('Session added successfully', '', {
          duration: this.durationInSeconds * 1000
        });
      }, (error) => {
        console.log(error);
      });
    } else {
      this.sessionService.updateSessions(this.sess, this.session.school.id).subscribe((sess) => {
        console.log(sess);
        this.redirectTo('/app/session');
        this.snackbar.open('Session updated successfully', '', {
          duration: this.durationInSeconds * 1000
        });
      }, (error) => {
        console.log(error);
      });
    }
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  deleteSession(course: number) {
    this.sessionService.deleteSession(course).subscribe((data) => {
      console.log('success');
      this.redirectTo('/app/session');
    }, (error) => {
      console.log(error);
    });
  }
  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        // DO SOMETHING
        this.deleteSession(id);
        this.openSnackBar();
      }
    });
  }

}
