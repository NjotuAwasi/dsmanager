import { Component, OnInit, ViewChild } from '@angular/core';
import { InstructorService } from 'src/app/services/instructor.service';
import { Instructor } from 'src/app/models/instructor';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent implements OnInit {

  date = new Date();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  title = 'angular-confirmation-dialog';
  durationInSeconds = 5;
  public instructors: Instructor[];
  public instructor = new Instructor();

  status = new FormControl('all');

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'gender', 'action'];
  dataSource = new MatTableDataSource(this.instructors);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private instructorService: InstructorService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

    ngOnInit() {
      this.instructorService.getInstructors().subscribe((instructors) => {
        console.log(instructors);
        this.instructors = instructors;
        this.dataSource.data = instructors;
      }, (error) => {
        console.log(error);
      });
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
      console.log(event)
    }
    openDialog(id: number): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: "Do you confirm the deletion of this data?"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Yes clicked');
          // DO SOMETHING
          this.deleteInstructor(id);
          this.openSnackBar();
        }
      });
    }
    refresh() {
      this.instructorService.getInstructors().subscribe((instructors) => {
        console.log(instructors);
        this.instructors = instructors;
        this.dataSource.data = instructors;
      }, (error) => {
        console.log(error);
      });
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
    deleteInstructor(instructor: number) {
      this.instructorService.deleteInstructor(instructor).subscribe((data) => {
        console.log('success');
        this.refresh();
      }, (error) => {
        console.log(error);
      });
      console.log(instructor);
    }
    updateInstructor(id: number) {
      this.instructorService.getInstructor(id).subscribe((instructor) => {
        this.instructor = instructor;
        console.log(this.instructor);
        this.refresh();
      }, (error) => {
        console.log(error);
      });
    }
    processForm() {
      console.log(this.instructor.users1);
      if (this.instructor.instructorPK.id == undefined) {
        this.instructor.users1.password = this.makeid(10);
        this.instructor.users1.datecreated = this.date;
        this.instructorService.addInstructor(this.instructor).subscribe((instructor) => {
          console.log(instructor);
          this.refresh();
        }, (error) => {
          console.log(error);
        });
      } else {
        this.instructor.users1.datemodified = this.date;
        this.instructorService.updateInstructor(this.instructor).subscribe((instructor) => {
          console.log(instructor);
          this.refresh();
        }, (error) => {
          console.log(error);
        });
      }
    }
    undefine() {
      this.instructor = new Instructor();
    }
    openSnackBar() {
      this.snackBar.open('Instructor deleted successfully', '', {
        duration: this.durationInSeconds * 1000
      });
    }
    makeid(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      console.log(result);
      return result;
    }

}
