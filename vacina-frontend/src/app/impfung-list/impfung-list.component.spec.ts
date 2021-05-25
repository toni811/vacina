import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpfungListComponent } from './impfung-list.component';

describe('ImpfungListComponent', () => {
  let component: ImpfungListComponent;
  let fixture: ComponentFixture<ImpfungListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpfungListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpfungListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
