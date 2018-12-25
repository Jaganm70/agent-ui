import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRequestsWindowComponent } from './chat-requests-window.component';

describe('ChatRequestsWindowComponent', () => {
  let component: ChatRequestsWindowComponent;
  let fixture: ComponentFixture<ChatRequestsWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRequestsWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRequestsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
