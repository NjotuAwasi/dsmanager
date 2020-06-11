import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: Course[];
  course = new Course();
  date = new Date();
  session = JSON.parse(sessionStorage.getItem('token'));
  durationInSeconds = 5;


  constructor(private courseService: CourseService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    if (this.session.school == null) {
      this.courseService.getCourses().subscribe(data => {
        this.courses = data;
        console.log(data);
      }, error => {
        console.log(error);
      });
    } else {
      this.courseService.getCoursesBySchool(this.session.school.id).subscribe(data => {
        this.courses = data;
        console.log(data);
      });
    }
  }

  updateCourse(id: number) {
    this.courseService.getCourse(id).subscribe(data => {
      console.log(data);
      this.course = data;
    }, error => {
      console.log(error);
    })
  }

  undefine() {
    this.course = new Course();
  }

  processForm() {
    if (this.course.id === undefined) {
      this.course.datecreated = this.date;
      this.session.school == null
      this.courseService.addCourse(this.course, this.session.school.id, this.session.id).subscribe((course) => {
        console.log(course);
        this.redirectTo('/app/courses');
        this.snackBar.open('Course added successfully', '', {
          duration: this.durationInSeconds * 1000
        });
      }, (error) => {
        console.log(error);
      });
    } else {
      this.course.datemodified = this.date;
      this.courseService.updateCourse(this.course, this.session.school.id).subscribe((course) => {
        console.log(course);
        this.redirectTo('/app/courses');
        this.snackBar.open('course updated successfully', '', {
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
  deleteCourse(course: number) {
    this.courseService.deleteCourse(course).subscribe((data) => {
      console.log('success');
      this.redirectTo('/app/courses');
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
        this.deleteCourse(id);
        this.openSnackBar();
      }
    });
  }
  openSnackBar() {
    this.snackBar.open('Course deleted successfully', '', {
      duration: this.durationInSeconds * 1000
    });
  }
}
