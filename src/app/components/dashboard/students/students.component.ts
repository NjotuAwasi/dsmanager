import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBarModule, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  date = new Date();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  title = 'angular-confirmation-dialog';
  durationInSeconds = 5;
  public students: Student[];
  public student = new Student();
  session = JSON.parse(sessionStorage.getItem('token'));
  

  status = new FormControl('all');

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'gender', 'action'];
  dataSource = new MatTableDataSource(this.students);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private studentService: StudentService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public route: Router) {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    if (this.session.school == null) {
      this.studentService.getStudents().subscribe((students) => {
        console.log(this.session.school);
        this.students = students;
        this.dataSource.data = students;
      }, (error) => {
        console.log(error);
      });
    } else {
      this.studentService.getStudentsBySchool(this.session.school.id).subscribe((students) => {
        console.log(this.session.school);
        this.students = students;
        this.dataSource.data = students;
      }, (error) => {
        console.log(error);
      });
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };


  }
  onFile(event) {
    console.log(event);
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
        this.deleteStudent(id);
        this.openSnackBar();
      }
    });
  }
  refresh() {
    if (this.session.school == null) {
      this.studentService.getStudents().subscribe((students) => {
        console.log(this.session.school);
        this.students = students;
        this.dataSource.data = students;
      }, (error) => {
        console.log(error);
      });
    } else {
      this.studentService.getStudentsBySchool(this.session.school.id).subscribe((students) => {
        console.log(this.session.school);
        this.students = students;
        this.dataSource.data = students;
      }, (error) => {
        console.log(error);
      });
    }
  }
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public open(event, item) {
    console.log('Open ' + item);
  }
  deleteStudent(student: number) {
    this.studentService.deleteStudent(student).subscribe((data) => {
      console.log('success');
      this.snackBar.open('student deleted successfully', '', {
        duration: this.durationInSeconds * 1000
      });
      this.redirectTo('/app/students');
    }, (error) => {
      console.log(error);
    });
    console.log(student);
  }
  updateStudent(id: number) {
    this.studentService.getStudent(id).subscribe((student) => {
      this.student = student;
      console.log(this.student);
    }, (error) => {
      console.log(error);
    });
  }
  processForm() {
    console.log(this.student.users1);
    if (this.student.studentPK.id === undefined) {
      this.student.users1.password = this.makeid(10);
      this.student.users1.datecreated = this.date;
      if (this.session.school == null) {
        this.studentService.addStudent(this.student).subscribe((student) => {
          console.log(student);
          this.snackBar.open('student added successfully', '', {
            duration: this.durationInSeconds * 1000
          });
          this.redirectTo('/app/students');
        }, (error) => {
          console.log(error);
        });
      } else {
        this.studentService.addStudentBySchool(this.student, this.session.school.id).subscribe(data => {
          console.log('success');
          this.snackBar.open('student added successfully', '', {
            duration: this.durationInSeconds * 1000
          });
          this.redirectTo('/app/students');
        }, error => {
          console.log(error);
        });
      }
    } else {
      this.student.users1.datemodified = this.date;
      this.studentService.updateStudent(this.student).subscribe((student) => {
        console.log(student);
        this.snackBar.open('student updated successfully', '', {
          duration: this.durationInSeconds * 1000
        });
        this.redirectTo('/app/students');
      }, (error) => {
        console.log(error);
      });
    }
  }
  undefine() {
    this.student = new Student();
  }
  openSnackBar() {
    this.snackBar.open('User deleted successfully', '', {
      duration: this.durationInSeconds * 1000
    });
  }
  makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
    return result;
  }
  inactive() {
    let status = 'inactive'
    this.studentService.getStudentsBySchoolAndStatus(this.session.school.id, status).subscribe((students) => {
      this.students = students;
      this.dataSource.data = students;
    }, (error) => {
      console.log(error);
    });
  }
  active() {
    let status = 'active'
    this.studentService.getStudentsBySchoolAndStatus(this.session.school.id, status).subscribe((students) => {
      this.students = students;
      this.dataSource.data = students;
    }, (error) => {
      console.log(error);
    });
  }
  redirectTo(uri: string) {
    this.route.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }
  openPdf(){
    this.studentService.print().subscribe(data=>{
      console.log("success");
    }, error=>{
      console.log(error);
    })
  }
}


