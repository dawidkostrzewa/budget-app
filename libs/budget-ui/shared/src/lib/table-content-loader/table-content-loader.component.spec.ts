import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContentLoaderComponent } from './table-content-loader.component';

describe('TableContentLoaderComponent', () => {
  let component: TableContentLoaderComponent;
  let fixture: ComponentFixture<TableContentLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableContentLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableContentLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
