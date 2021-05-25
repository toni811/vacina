import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpfungFormComponent } from './impfung-form.component';

describe('ImpfungFormComponent', () => {
  let component: ImpfungFormComponent;
  let fixture: ComponentFixture<ImpfungFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpfungFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpfungFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
