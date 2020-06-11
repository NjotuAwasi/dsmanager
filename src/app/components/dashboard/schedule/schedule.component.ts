import { Component, OnInit } from '@angular/core';
import { EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from 'src/app/models/schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { InstructorService } from 'src/app/services/instructor.service';
import { Instructor } from 'src/app/models/instructor';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedule: Schedule[];
  private event: DataManager = new DataManager({
    url: 'http://localhost:8080/schedules/schedules',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
 
  public eventObject: EventSettingsModel = {
    
    dataSource: this.event,
    fields: {
      subject: {name: 'subject'},
      startTime: {name: 'startdate'},
      endTime: {name: 'enddate'},
      isAllDay: {name: 'isallday'},
      location: {name: 'location'},
      description: {name: 'description'},
      recurrenceRule: {name: 'recurrencerule'}
    }
  };
  session = JSON.parse(sessionStorage.getItem('token'));

  instructors: Instructor[];

  constructor(private scheduleService: ScheduleService, private instructorService: InstructorService) { }

  ngOnInit(
  ) {
    this.instructorService.getInstructors().subscribe(data =>{
      this.instructors = data;
    });
    var session = localStorage.getItem('token');
    console.log('token: ', JSON.parse(session));
    this.scheduleService.getSchedules().subscribe(data=>{
      this.schedule = data;
      console.log(this.schedule);
    }, error =>{
      console.log(error);
    });
  }

}
