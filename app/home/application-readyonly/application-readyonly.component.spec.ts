import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReadyonlyComponent } from './application-readyonly.component';

describe('ApplicationReadyonlyComponent', () => {
  let component: ApplicationReadyonlyComponent;
  let fixture: ComponentFixture<ApplicationReadyonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationReadyonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReadyonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
