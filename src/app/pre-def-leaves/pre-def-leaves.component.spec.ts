import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDefLeavesComponent } from './pre-def-leaves.component';

describe('PreDefLeavesComponent', () => {
  let component: PreDefLeavesComponent;
  let fixture: ComponentFixture<PreDefLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreDefLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDefLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
