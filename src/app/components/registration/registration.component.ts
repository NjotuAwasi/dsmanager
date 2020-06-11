import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/school';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Schooladministrator } from 'src/app/models/schooladministrator';
import { SchoolService } from 'src/app/services/school.service';
import { SchooladministratorService } from 'src/app/services/schooladministrator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  date = new Date();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  school = new School();
  schooladministrator = new Schooladministrator();
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private schoolService: SchoolService,
              private schooladministratorService: SchooladministratorService, private route: Router) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: [
        '',
        Validators.compose([
          Validators.required, Validators.pattern('[0-9]{9}')
        ])
      ],
      city: [''],
      location: [''],
      description: ['']
    });
    this.secondFormGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      adminemail: [''],
      adminphone: [''],
      gender: [''],
      login: [''],
      birthdate: [''],
      password: ['']
    });
  }

  processForm() {

    this.schooladministrator.users1.school = this.school;

    this.schooladministratorService.addSchoolAdministrator(this.schooladministrator).subscribe(data => {
      console.log('success');
      console.log(this.schooladministrator.users1.school);
      this.redirectTo('/');
    }, error => {
      console.log(error);
    });
  }
  redirectTo(uri: string) {
    this.route.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }
}
