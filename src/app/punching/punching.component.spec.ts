import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchingComponent } from './punching.component';

describe('PunchingComponent', () => {
  let component: PunchingComponent;
  let fixture: ComponentFixture<PunchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunchingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
