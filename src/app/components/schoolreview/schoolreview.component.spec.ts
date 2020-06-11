import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolreviewComponent } from './schoolreview.component';

describe('SchoolreviewComponent', () => {
  let component: SchoolreviewComponent;
  let fixture: ComponentFixture<SchoolreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
