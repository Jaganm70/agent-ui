import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTemplatesComponent } from './agent-templates.component';

describe('AgentTemplatesComponent', () => {
  let component: AgentTemplatesComponent;
  let fixture: ComponentFixture<AgentTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
