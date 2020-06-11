import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/school';
import { SchoolService } from 'src/app/services/school.service';
import { Student } from 'src/app/models/student';
import { TranslateService } from '@ngx-translate/core';
import { StudentService } from 'src/app/services/student.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {

  private schools: School[];
  private school =  new School;
  private student = new Student();
  durationInSeconds = 5;
  private students: Student[];
  constructor(private schoolService: SchoolService,
    private translate: TranslateService,
    private studentService: StudentService,
    private snackbar: MatSnackBar,
    private route: Router,
    private reviewService: ReviewService,
    private studentSerice: StudentService) { 

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.schoolService.getSchools().subscribe(data => {
      this.schools = data;
      console.log(this.schools);
    },error => {
      console.log(error);
    });
  }
  schoolId(id: number){
    this.school.id = id;
    this.studentSerice.getReviewBySchool(id).subscribe(data => {
      console.log(data);
      this.students = data;
    }, error=>{
      console.log(error);
    })
  }
  processForm(){
    this.student.status = "inactive";
    this.studentService.addStudentBySchool(this.student, this.school.id).subscribe(data => {
      console.log('success');
      this.snackbar.open('registered successfully', '', {
        duration: this.durationInSeconds * 1000
      });
      this.redirectTo('/schools');
    }, error => {
      console.log(error);
    });
  }
  redirectTo(uri: string) {
    this.route.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }
}
