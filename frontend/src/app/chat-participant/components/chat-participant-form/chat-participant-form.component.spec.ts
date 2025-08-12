import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatParticipantFormComponent } from './chat-participant-form.component';

describe('ChatParticipantFormComponent', () => {
  let component: ChatParticipantFormComponent;
  let fixture: ComponentFixture<ChatParticipantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatParticipantFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatParticipantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
