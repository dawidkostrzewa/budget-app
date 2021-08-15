import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSummaryPageComponent } from './year-summary-page.component';

describe('YearSummaryPageComponent', () => {
  let component: YearSummaryPageComponent;
  let fixture: ComponentFixture<YearSummaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearSummaryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
