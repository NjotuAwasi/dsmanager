import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { SchoolService } from 'src/app/services/school.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle';
import { Instructor } from 'src/app/models/instructor';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {

  public cars: Vehicle[];
  public car = new Vehicle();
  date = new Date();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  session = JSON.parse(sessionStorage.getItem('token'));
  durationInSeconds = 5;
  instructors: Instructor[];
  instructor = new Instructor();

  constructor(private carService: CarService,
    private instructorService: InstructorService,
    private schoolService: SchoolService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private route: Router) { }

  ngOnInit() {
    this.instructorService.getInstructors().subscribe(data =>{
      this.instructors = data;
    });
    if (this.session.school == null) {
      this.carService.getVehicles().subscribe((cars) => {
        console.log(this.session.school);
        this.cars = cars;
      }, (error) => {
        console.log(error);
      });
    } else {
      this.carService.getVehiclesBySchool(this.session.school.id).subscribe((cars) => {
        console.log(cars);
        this.cars = cars;
      }, (error) => {
        console.log(error);
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
        this.deleteCar(id);
        this.openSnackBar();
      }
    });
  }
  deleteCar(branch: number) {
    this.carService.deleteVehicle(branch).subscribe((data) => {
      console.log('success');
      this.redirectTo('/app/fleet');
    }, (error) => {
      console.log(error);
    });
  }
  openSnackBar() {
    this.snackbar.open('Vehicle deleted successfully', '', {
      duration: this.durationInSeconds * 1000
    });
  }
  updateCar(id: number) {
    this.carService.getVehicle(id).subscribe((car) => {
      this.car = car;
      console.log(this.car);
    }, (error) => {
      console.log(error);
    });
  }
  processForm() {
    if (this.car.id === undefined) {
      this.car.datecreated = this.date;
        this.carService.addVehicle(this.car, this.session.school.id, this.instructor.instructorPK.id).subscribe(data => {
          console.log('success');
          this.redirectTo('/app/fleet');
          this.snackbar.open('Vehicle added successfully', '', {
            duration: this.durationInSeconds * 1000
          });
        }, error => {
          console.log(error);
        });
    } else {
      this.car.datemodified = this.date;
      this.carService.updateVehicles(this.car, this.session.school.id).subscribe((branch) => {
        console.log(branch);
        this.redirectTo('/app/fleet');
        this.snackbar.open('Vehicle updated successfully', '', {
          duration: this.durationInSeconds * 1000
        });
      }, (error) => {
        console.log(error);
      });
    }
  }
  option(id: number){
    this.instructor.instructorPK.id = id;
    console.log(id);
  }
  redirectTo(uri: string) {
    this.route.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }
  undefine() {
    this.car = new Vehicle();
  }
}
