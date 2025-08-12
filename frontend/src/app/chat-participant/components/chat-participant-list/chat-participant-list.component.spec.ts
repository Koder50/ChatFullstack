import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatParticipantListComponent } from './chat-participant-list.component';

describe('ChatParticipantListComponent', () => {
  let component: ChatParticipantListComponent;
  let fixture: ComponentFixture<ChatParticipantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatParticipantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatParticipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
