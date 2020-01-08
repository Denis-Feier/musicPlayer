import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareRequestPageComponent } from './share-request-page.component';

describe('ShareRequestPageComponent', () => {
  let component: ShareRequestPageComponent;
  let fixture: ComponentFixture<ShareRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
