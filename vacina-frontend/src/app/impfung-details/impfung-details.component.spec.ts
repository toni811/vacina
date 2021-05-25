import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpfungDetailsComponent } from './impfung-details.component';

describe('ImpfungDetailsComponent', () => {
  let component: ImpfungDetailsComponent;
  let fixture: ComponentFixture<ImpfungDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpfungDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpfungDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
