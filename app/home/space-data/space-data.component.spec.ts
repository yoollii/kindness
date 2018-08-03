import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceDataComponent } from './space-data.component';

describe('SpaceDataComponent', () => {
  let component: SpaceDataComponent;
  let fixture: ComponentFixture<SpaceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
