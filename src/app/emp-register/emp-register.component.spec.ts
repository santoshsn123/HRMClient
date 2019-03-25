import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpRegisterComponent } from './emp-register.component';

describe('EmpRegisterComponent', () => {
  let component: EmpRegisterComponent;
  let fixture: ComponentFixture<EmpRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
