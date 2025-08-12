import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatParticipantCommandBarComponent } from './chat-participant-command-bar.component';

describe('ChatParticipantCommandBarComponent', () => {
  let component: ChatParticipantCommandBarComponent;
  let fixture: ComponentFixture<ChatParticipantCommandBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatParticipantCommandBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatParticipantCommandBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
