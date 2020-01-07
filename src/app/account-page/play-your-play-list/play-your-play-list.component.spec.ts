import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayYourPlayListComponent } from './play-your-play-list.component';

describe('PlayYourPlayListComponent', () => {
  let component: PlayYourPlayListComponent;
  let fixture: ComponentFixture<PlayYourPlayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayYourPlayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayYourPlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
