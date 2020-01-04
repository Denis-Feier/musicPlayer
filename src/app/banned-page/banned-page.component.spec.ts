import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedPageComponent } from './banned-page.component';

describe('BannedPageComponent', () => {
  let component: BannedPageComponent;
  let fixture: ComponentFixture<BannedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
