import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganmanagementComponent } from './organmanagement.component';

describe('OrganmanagementComponent', () => {
  let component: OrganmanagementComponent;
  let fixture: ComponentFixture<OrganmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
