import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderForAppComponent } from './calender-for-app.component';

describe('CalenderForAppComponent', () => {
  let component: CalenderForAppComponent;
  let fixture: ComponentFixture<CalenderForAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderForAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderForAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
