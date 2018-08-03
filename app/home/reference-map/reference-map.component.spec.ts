import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceMapComponent } from './reference-map.component';

describe('ReferenceMapComponent', () => {
  let component: ReferenceMapComponent;
  let fixture: ComponentFixture<ReferenceMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
