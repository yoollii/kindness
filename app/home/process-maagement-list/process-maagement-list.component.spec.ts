import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessMaagementListComponent } from './process-maagement-list.component';

describe('ProcessMaagementListComponent', () => {
  let component: ProcessMaagementListComponent;
  let fixture: ComponentFixture<ProcessMaagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessMaagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessMaagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
