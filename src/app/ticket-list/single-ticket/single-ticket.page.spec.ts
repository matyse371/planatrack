import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SingleTicketPage } from './single-ticket.page';

describe('SingleTicketPage', () => {
  let component: SingleTicketPage;
  let fixture: ComponentFixture<SingleTicketPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SingleTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
