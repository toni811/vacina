import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrtLisComponent } from './ort-lis.component';

describe('OrtLisComponent', () => {
  let component: OrtLisComponent;
  let fixture: ComponentFixture<OrtLisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrtLisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrtLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
