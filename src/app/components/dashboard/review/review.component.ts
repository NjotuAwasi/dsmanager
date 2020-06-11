import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';
import { ReviewService } from 'src/app/services/review.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  session = JSON.parse(sessionStorage.getItem('token'));
  student = new Student();
  date = new Date();
  durationInSeconds = 5;
  show = false;

  constructor(private studentService: StudentService,
    private reviewService: ReviewService,
    private snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit() {
    this.studentService.getStudentByUser(this.session.id).subscribe(data=>{
      this.student = data;
      if(this.student.review != null){
        this.show = true;
        
      }else{
        this.student = new Student();
      }
    },error=>{
      console.log(error);
    });
  }
  processForm() {
    if (this.student.review.id == undefined) {
      this.student.users1.datecreated = this.date;
        this.reviewService.addReview(this.student.review, this.session.school.id, this.session.id).subscribe(data => {
          console.log('success');
          this.snackBar.open('review added successfully', '', {
            duration: this.durationInSeconds * 1000
          });
          this.redirectTo('/app/review');
        }, error => {
          console.log(error);
        });
    } else {
      this.student.review.datemodified = this.date;
      this.reviewService.updateReview(this.student.review).subscribe((review) => {
        console.log(review);
        this.snackBar.open('Review updated successfully', '', {
          duration: this.durationInSeconds * 1000
        });
        this.redirectTo('/app/review');
      }, (error) => {
        console.log(error);
      });
    }
  }
  redirectTo(uri: string) {
    this.route.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }

}
