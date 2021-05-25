import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpfungListItemComponent } from './impfung-list-item.component';

describe('ImpfungListItemComponent', () => {
  let component: ImpfungListItemComponent;
  let fixture: ComponentFixture<ImpfungListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpfungListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpfungListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
