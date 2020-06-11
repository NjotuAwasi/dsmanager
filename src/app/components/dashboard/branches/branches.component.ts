import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/services/branch.service';
import { Branch } from 'src/app/models/branch';
import { StudentService } from 'src/app/services/student.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { Branchmanager } from 'src/app/models/branchmanager';
import { BranchmanagerService } from 'src/app/services/branchmanager.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  branches: Branch[];
  branch = new Branch();
  branchmanager = new Branchmanager();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  session = JSON.parse(sessionStorage.getItem('token'));
  durationInSeconds = 5;
  date = new Date();
  branchId: number;
  showdelete = false;
  i = 0;

  constructor(private branchService: BranchService,
              private studentService: StudentService,
              private instructorService: InstructorService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public route: Router,
              public branchmanagerService: BranchmanagerService) { }
  ngOnInit() {
    this.branchmanager = new Branchmanager();
    if (this.session.school == null) {
      this.branchService.getBranches().subscribe(data => {
        this.branches = data;
        console.log(data);
        this.branches.forEach((element) => {
          // tslint:disable-next-line: no-shadowed-variable
          this.studentService.countStudents(element.id).subscribe(data => {
            console.log(data);
            this.branches[this.i].countStudent = data;
          }, error => {
            console.log(error);
          });
          // tslint:disable-next-line: no-shadowed-variable
          this.instructorService.countInstructors(element.id).subscribe(data => {
            console.log(data);
            this.branches[this.i].countInstructor = data;
            this.i++;
          }, error => {
            console.log(error);
          });
        });
      });
    } else {
      this.branchService.getBranchesBySchool(this.session.school.id).subscribe(data => {
        this.branches = data;
        console.log(data);
        this.branches.forEach((element) => {
          // tslint:disable-next-line: no-shadowed-variable
          this.studentService.countStudents(element.id).subscribe(data => {
            console.log(data);
            this.branches[this.i].countStudent = data;
          }, error => {
            console.log(error);
          });
          // tslint:disable-next-line: no-shadowed-variable
          this.instructorService.countInstructors(element.id).subscribe(data => {
            console.log(data);
            this.branches[this.i].countInstructor = data;
            this.i++;
          }, error => {
            console.log(error);
          });
        });
      });
    }
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
        this.deleteBranch(id);
        this.openSnackBar();
      }
    });
  }
  deleteBranch(branch: number) {
    this.branchService.deleteBranch(branch).subscribe((data) => {
      console.log('success');
      this.redirectTo('/app/branches');
    }, (error) => {
      console.log(error);
    });
  }
  openSnackBar() {
    this.snackBar.open('Branch deleted successfully', '', {
      duration: this.durationInSeconds * 1000
    });
  }
  updateBranch(id: number) {
    this.branchService.getBranch(id).subscribe((branch) => {
      this.branch = branch;
      console.log(this.branch);
    }, (error) => {
      console.log(error);
    });
  }
  processForm() {
    if (this.branch.id === undefined) {
      this.branch.datecreated = this.date;
      if (this.session.school == null) {
        this.branchService.addBranch(this.branch, this.session.school.id).subscribe((branch) => {
          console.log(branch);
          this.redirectTo('/app/branches');
          this.snackBar.open('Branch added successfully', '', {
            duration: this.durationInSeconds * 1000
          });
        }, (error) => {
          console.log(error);
        });
      } else {
        this.branchService.addBranch(this.branch, this.session.school.id).subscribe(data => {
          console.log('success');
          this.redirectTo('/app/branches');
          this.snackBar.open('Branch added successfully', '', {
            duration: this.durationInSeconds * 1000
          });
        }, error => {
          console.log(error);
        });
      }
    } else {
      this.branch.datemodified = this.date;
      this.branchService.updateBranch(this.branch, this.session.school.id).subscribe((branch) => {
        console.log(branch);
        this.redirectTo('/app/branches');
        this.snackBar.open('Branch updated successfully', '', {
          duration: this.durationInSeconds * 1000
        });
      }, (error) => {
        console.log(error);
      });
    }
  }
  redirectTo(uri: string) {
    this.route.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }
  undefine() {
    this.branch = new Branch();
    this.branchmanager = new Branchmanager();
    this.showdelete = false;
  }
  bm(id: number) {
    this.branchId = id;
    this.branchmanagerService.getBranchmanagerByBranch(id).subscribe(data => {
      if (data.length === 0) {
        console.log(data);
        this.branchmanager.branchmanagerPK.id = undefined;
      } else {
        this.branchmanager = data[0];
        this.showdelete = true;
      }
    }, error => {
      console.log(error);
    });
  }
  processBranchManager() {
    if (this.branchmanager.branchmanagerPK.id === undefined) {
      this.branchmanager.users1.datecreated = this.date;
      if (this.session.school == null) {
        console.log(this.session.school);
      } else {
        // tslint:disable-next-line: max-line-length
        this.branchmanagerService.addBranchmanagerBySchoolByBranch(this.branchmanager, this.session.school.id, this.branchId).subscribe(() => {
          console.log('success');
          this.redirectTo('/app/branches');
          this.snackBar.open('Branch manager added successfully', '', {
            duration: this.durationInSeconds * 1000
          });
        }, error => {
          console.log(error);
        });
      }
    } else {
      console.log(this.branchmanager.branchmanagerPK.id);
      this.branchmanager.users1.datemodified = this.date;
      this.branchmanagerService.updateBranchmanager(this.branchmanager).subscribe((branchmanager) => {
        console.log(branchmanager);
        this.branchmanager.branchmanagerPK.id = undefined;
        this.redirectTo('/app/branches');
        this.snackBar.open('Branch manager updated successfully', '', {
          duration: this.durationInSeconds * 1000
        });
      }, (error) => {
        console.log(error);
      });
    }
  }
  deleteManager() {
    this.branchmanagerService.deletebrBranchmanager(this.branchmanager.branchmanagerPK.id).subscribe(data => {
      console.log('success');
      this.redirectTo('/app/branches');
      this.snackBar.open('Branch manager deleted successfully', '', {
        duration: this.durationInSeconds * 1000
      });
    }, error => {
      console.log(error);
    });
  }
}
