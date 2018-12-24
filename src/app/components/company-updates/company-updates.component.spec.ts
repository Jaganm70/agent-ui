import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUpdatesComponent } from './company-updates.component';

describe('CompanyUpdatesComponent', () => {
  let component: CompanyUpdatesComponent;
  let fixture: ComponentFixture<CompanyUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
