import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentUtilsComponent } from './agent-utils.component';

describe('AgentUtilsComponent', () => {
  let component: AgentUtilsComponent;
  let fixture: ComponentFixture<AgentUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
