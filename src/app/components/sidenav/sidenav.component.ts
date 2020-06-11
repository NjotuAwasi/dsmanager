import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MediaMatcher} from '@angular/cdk/layout';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  mode = new FormControl('side');
  mobileQuery: MediaQueryList;
  session = JSON.parse(sessionStorage.getItem('token'));
  user = new User

  admin = false;
  student = false;
  instructor = false;
  manager = false;
  schooladmin = false;

  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    
    if(this.session.userroleList[0].role1.name == 'ADMIN') {

      this.admin = true;

    }else if(this.session.userroleList[0].role1.name == 'STUDENT') {

      this.student = true;

    }else if(this.session.userroleList[0].role1.name == 'SCHOOL_ADMIN'){

      this.schooladmin = true;

      console.log(this.schooladmin);

    }else if(this.session.userroleList[0].role1.name == 'INSTRUCTOR'){

      this.instructor = true;
      
    }else if(this.session.userroleList[0].role1.name == 'BRANCH_MANAGER'){

      this.manager = true;
      
    }else{
      console.log("error");
    }
  }

  OnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
