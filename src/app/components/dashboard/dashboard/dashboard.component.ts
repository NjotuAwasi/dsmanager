import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/app/services/instructor.service';
import { BranchService } from 'src/app/services/branch.service';
import { CarService } from 'src/app/services/car.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  session = JSON.parse(sessionStorage.getItem('token'));
  student = 0;
  instructor = 0;
  branch = 0;
  car = 0;
  schedule = 0;

  constructor(public studentService: StudentService,
    public instructorService: InstructorService,
    public branchService: BranchService,
    public carService: CarService,
    public scheduleService: ScheduleService) { }

  ngOnInit() {
    if(this.session.school === null){
      console.log('suc');
    }else{
      this.studentService.countStudentsBySchool(this.session.school.id).subscribe(data => {
        this.student = data;
      });
      this.instructorService.countInstructorsBySchool(this.session.school.id).subscribe(data => {
        this.instructor = data;
      });
      this.branchService.countBranchesBySchool(this.session.school.id).subscribe(data => {
        this.branch = data;
      });
      this.carService.countVehiclesBySchool(this.session.school.id).subscribe(data => {
        this.car = data;
      });
      this.scheduleService.countScheduleBySchool(this.session.school.id).subscribe(data => {
        this.schedule = data;
        console.log(data);
      },error=>{
        console.log(error);
      });
    }
  }

}
