import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCalenderComponent } from './users-calender.component';

describe('UsersCalenderComponent', () => {
  let component: UsersCalenderComponent;
  let fixture: ComponentFixture<UsersCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
